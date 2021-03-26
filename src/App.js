import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'
import { Helmet } from 'react-helmet'
import { IntlProvider } from 'react-intl'
import { ToastProvider } from '@vtex/styleguide/lib/ToastProvider'

import Cart from './components/Cart.js'
import StepProfile from './components/StepProfile.js'
import StepShipping from './components/StepShipping.js'
import StepAddress from './components/StepAddress.js'
import StepPayment from './components/StepPayment.js'

import MiniCart from './components/MiniCart.js'
import ItemsList from './components/ItemsList.js'
import Modal from './components/Modal.js'
import Sidebar from './components/Sidebar.js'
import PickupDetails from './components/PickupDetails.js'
import PickupList from './components/PickupList.js'
import NavigationHeader from './components/NavigationHeader.js'
import Spacer from './components/Spacer.js'

import { currencyOptions, timeOptions, dateOptions } from './data/const.js'

import './tachyons.min.css'
import './theme.global.css'
import './theme.local.css'

import FormatMessage from './FormatMessage.js'
import FormatDate from './FormatDate.js'
import FormatTime from './FormatTime.js'
import FormatRelative from './FormatRelative.js'

import cartItemsJson from './data/cartItems.json'
import SLAS from './data/slas.json'

const LOCALES = {
	"pt-BR": require('./locales/pt-BR').default,
	"es-AR": require('./locales/es-AR').default,
	"en-US": require('./locales/en-US').default,
}

const DEFAULT_LOCALE = 'pt-BR';
const DEFAULT_STEP = 'cart';
const DEFAULT_ADDRESS = {
	street: 'Rua Fonte da Saudade',
	number: '',
	neighbourhood: 'Lagoa',
	city: 'Rio de Janeiro',
	state: 'RJ',
};

class Checkout extends Component {
  constructor() {
		super()
		
		this.state = {
			slas: SLAS.items,
			locale: DEFAULT_LOCALE,
			cartItems: cartItemsJson.items,
			remainingItems: cartItemsJson.items,
			currentStep: DEFAULT_STEP,
			lastStep: DEFAULT_STEP,
			modalPage: null,
			modalPageBack: [],
			pickupToShow: null,
			selectedSla: [],
			hasAddressStep: true,
			showingItemsList: {},
			steps: [
				{name: 'cart', available: true, bar: false},
				{name: 'profile', available: true, bar: true},
				{name: 'shipping', available: true, bar: true},
				{name: 'address', available: true, bar: true},
				{name: 'payment', available: true, bar: true},
				{name: 'review', available: true, bar: true},
				{name: 'confirmation', available: true, bar: false},
			],
			minicart: false,
			location: '',
			address: DEFAULT_ADDRESS,
    }
	}

	handleGoBack = () => {
		switch (this.state.currentPage) {
			case 'TakeProducts':
				if (this.state.mode === 'choose-by-item') {
					this.handleGoTo('ChooseByItem')
				} else {
					return null
				}
			break
			case 'ChooseByItem':
				this.handleGoBackToAllItems()
			break
			case 'PickupDetails':
				this.handleGoTo(this.state.lastPage)
			break
			case 'ShippingSchedulingDetails':
				this.handleGoTo('ShippingDetails')
			break
			case 'PickupSchedulingDetails':
				this.handleGoTo('PickupDetails')
			break
			default:
				this.handleGoTo('TakeProducts')
			break
		}	
	}

	handleSetLocation = (location) => {
    this.setState({
			location: location,
		})
	}

	handleGoTo = (page) => {
    this.setState({
			lastPage: this.state.currentPage,
		})

		this.setState({
			currentPage: page,
		})
	}

	handleGoToStep = (step) => {
    this.setState({
			lastStep: this.state.currentStep,
		})

		this.setState({
			currentStep: step,
		})
	}

	handleGoToNextStep = () => {
		let currentStep = this.state.currentStep
		let index = _.findIndex(this.state.steps, step => step.name === currentStep)

		this.setState({
			currentStep: this.state.steps[index + 1].name,
		})
	}

	handleModalClose = () => {
    this.setState({
			minicart: false,
			modalPage: null,
			modalPageBack: []
		})
	}

	handleModalOpen = (page) => {
    this.setState({
			modalPage: page,
		})
	}

	handleMiniCartOpen = (page) => {
    this.setState({
			minicart: true,
		})
	}

	handleModalSetPageBack = (page) => {
		this.setState(state => {
			const modalPageBack = _.concat(this.state.modalPageBack, page)

			return { modalPageBack }
		})

	}

	handleModalGoBack = () => {
		let pageList = JSON.parse(JSON.stringify(this.state.modalPageBack))

    this.handleModalOpen(_.last(pageList))

		this.setState(state => {
			const modalPageBack = _.initial(pageList)

			return { modalPageBack }
		})
	}

	handleSetNewAddress = () => {
    this.setState({
			address: null,
			currentPage: 'Address',
		})
	}

	handleSetShowingItemsList = (options) => {
		this.setState({
			showingItemsList: options,
			modalPage: 'itemsList'
		})
	}

	handleSelectSla = (sla) => {
		let remainingItems = JSON.parse(JSON.stringify(this.state.remainingItems))

		let selectedItems = _.filter(remainingItems, (remItem) => {
			return sla.availableItems.indexOf(remItem.id) !== -1
		})
		
		sla.selectedItems = selectedItems

		// NOT WORKING - Try to merge when selecting same SLA
		let newSelectedSla = JSON.parse(JSON.stringify(this.state.selectedSla))
		newSelectedSla = _.remove(newSelectedSla, item => item.id !== sla.id)
		this.updateRemainingItems()
		newSelectedSla = newSelectedSla.concat(sla)

		this.setState({
			selectedSla: newSelectedSla
		}, () => {
			this.updateRemainingItems()
		})
	}

	handleShowPickup = (pickup) => {
		this.setState({
			modalPage: 'pickupDetails',
			pickupToShow: pickup
		})
	}

	handleRemoveSelectedSla = (sla) => {
		this.setState(state => {
			const selectedSla = _.remove(this.state.selectedSla, (item) => {
				return item.id !== sla
			})

			return {
				selectedSla
			}
		}, () => {
			this.updateRemainingItems()
		})
	}

	componentDidMount() {
		this.updateRemainingItems()
	}

	updateRemainingItems = () => {
		let remainingItems = JSON.parse(JSON.stringify(this.state.cartItems))
		let selectedSla = this.state.selectedSla
		let itemsAlreadySelected = []

		// Check need for Address
		let hasAddressStep = _.filter(selectedSla, sla => sla.channel === 'delivery')

		// Calculate selected items
		if (selectedSla.length > 0) {
			selectedSla.forEach(sla => {
				sla.selectedItems.forEach((item) => {
					itemsAlreadySelected.push(item.id)
				})
			})

			// Remove selected item from remaining
			remainingItems = _.remove(remainingItems, item => itemsAlreadySelected.indexOf(item.id) === -1)
		}

		// Update remaining items of each sla
		let newSlas = this.state.slas.map(sla => {
      sla.remainingItems = _.filter(sla.availableItems, item => itemsAlreadySelected.indexOf(item) === -1)
      sla.remainingItemsFull = _.filter(remainingItems, item => sla.remainingItems.indexOf(item.id) !== -1)
      sla.unavailableItemsFull = _.filter(remainingItems, item => sla.remainingItems.indexOf(item.id) === -1)
			return sla
		})

		// Update remaining items
		this.setState({
			remainingItems: remainingItems,
			slas: newSlas,
			hasAddressStep: hasAddressStep,
		}, () => {
		})
	}
	
	handleUpdateQuantity = (index, quantity) => {
		this.setState({
			cartItems: update(
				this.state.cartItems, {
					[index]: {
						quantity: {$set: parseInt(quantity)}
					}
				}
			)
		})
	}

	handleFormatData = (value, type, deliveryChannel) => {
		let cultureInfo = 'pt-BR'
		let day = 86400000
		let formattedDateTime = value
		switch (type) {
			case 'week':
				formattedDateTime = <FormatDate id={(Date.now() + day * value, { weekday: 'short' })}/>
			break
			case 'longDate':
				formattedDateTime = <FormatDate id={(Date.now() + day * value, { day: '2-digit', month: 'long' })}/>
				if (deliveryChannel === 'pickup') formattedDateTime = <FormatMessage id={({id: 'checkout.readyIn'}) + ' ' + formattedDateTime}/>
			break
			case 'date':
				formattedDateTime = <FormatDate id={(Date.now() + day * value, dateOptions)}/>
			break
			case 'relative':
				formattedDateTime = <FormatRelative id={(Date.now() + day)}/>
			break
			case 'time':
			if (cultureInfo === 'pt-BR') {
					formattedDateTime = <FormatTime id={(value)}/> + 'h'
				} else {
					formattedDateTime = <FormatTime id={(value, timeOptions)}/>
				}
			break
			case 'minutes':
			case 'days':
			case 'businessDays':
				let messageDelivery = <FormatMessage id={{id: 'checkout.' + type}}/>
				let messagePickup = <FormatMessage id={{id: 'checkout.readyIn'}}/>
				formattedDateTime = <span><span>{formattedDateTime}</span>{' '}<span>{messageDelivery}</span></span>
				if (deliveryChannel === 'pickup') formattedDateTime = <span>{messagePickup}<span></span>{' '}<span>{formattedDateTime}</span></span>
			break
		}

		return formattedDateTime
	}

  render() {
    let {
			slas,
			locale,
			cartItems,
			steps,
			currentStep,
			location,
			address,
			selectedSla,
			modalPage,
			modalPageBack,
			pickupToShow,
			hasAddressStep,
			remainingItems,
			showingItemsList,
			minicart,
			setLocation,
		} = this.state
		
		if (locale === 'pt-BR') {
			currencyOptions.currency = 'BRL'
			timeOptions.hour12 = false
		}

		return (
			<IntlProvider locale={this.state.locale} messages={LOCALES[this.state.locale]}>
			<ToastProvider>
				<div className="flex flex-column h-100">
					<Helmet>
						<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
					</Helmet>

	        <NavigationHeader
						openMiniCart={this.handleMiniCartOpen}
						step={currentStep}
						steps={steps}
						goToStep={this.handleGoToStep}
					/>

					{
						currentStep === 'cart' &&
						<Cart
							cartItems={cartItems}
							updateQuantity={this.handleUpdateQuantity}
							goToNextStep={this.handleGoToNextStep}
						/>
					}


					{/* Steps */}
					{
						currentStep === 'profile' &&
						<StepProfile
							goToNextStep={this.handleGoToNextStep}
						/>
					}

					{
						currentStep === 'shipping' &&
						<StepShipping
							location={location}
							slas={slas}
							products={cartItems}
							selectedSla={selectedSla}
							remainingItems={remainingItems}
							hasAddressStep={hasAddressStep}
							setLocation={this.handleSetLocation}
							selectSla={this.handleSelectSla}
							formatData={this.handleFormatData}
							removeSelectedSla={this.handleRemoveSelectedSla}
							setShowingItemsList={this.handleSetShowingItemsList}
							showPickup={this.handleShowPickup}
							modalOpen={this.handleModalOpen}
							goToNextStep={this.handleGoToNextStep}
						/>
					}

					{
						currentStep === 'address' &&
						<StepAddress
							address={address}
							location={location}
							goToNextStep={this.handleGoToNextStep}
						/>
					}

					{
						currentStep === 'payment' &&
						<StepPayment
							goToNextStep={this.handleGoToNextStep}
						/>
					}


					{/* Modal pages */}
					{
						modalPage && 
						<Modal
							modalPage={modalPage}
							modalPageBack={modalPageBack}
							modalGoTo={this.handleModalOpen}
							modalClose={this.handleModalClose}
							modalGoBack={this.handleModalGoBack}
						>
							{
								modalPage === 'pickupList' && (
									<PickupList
										formatData={this.handleFormatData}
										slas={slas}
										showPickup={this.handleShowPickup}
										modalSetPageBack={this.handleModalSetPageBack}
									/>
								)
							}
							{
								modalPage === 'itemsList' && (
									<ItemsList
										options={showingItemsList}
									/>
								)
							}
							{
								modalPage === 'pickupDetails' && (
									<PickupDetails
										products={cartItems}
										remainingItems={remainingItems}
										pickup={pickupToShow}
										modalPageBack={modalPageBack}
										modalOpen={this.handleModalOpen}
										modalClose={this.handleModalClose}
										selectSla={this.handleSelectSla}
										formatData={this.handleFormatData}
										setShowingItemsList={this.handleSetShowingItemsList}
										modalSetPageBack={this.handleModalSetPageBack}
									/>
								)
							}
						</Modal>
					}

					{
						minicart &&
							<Sidebar
								modalClose={this.handleModalClose}
							>
								<MiniCart
									cartItems={cartItems}
									updateQuantity={this.handleUpdateQuantity}
									goToStep={this.handleGoToStep}
								/>
							</Sidebar>
					}

					<Spacer />
				</div>
			</ToastProvider>
			</IntlProvider>
    )
  }
}

export default Checkout
