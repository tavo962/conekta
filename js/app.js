'use strict'

var app = angular.module( 'app', [] );

// TODO: CHECK []
app.factory( 'conekta', [ function() {
	var conekta = {};

	conekta.core = Conekta || null;

	conekta.token = function( card, success, error ) {

	};

	conekta.generate = function( card ) {
		// Check length
		if( ! card )
			return;

		var form = document.createElement( 'form' );
		var input = null;

		for( var index in card ) {
			input = document.createElement( 'input' );
			input.setAttribute( 'data-conekta', 'card[' + index + ']' );
			input.setAttribute( 'type', 'text' );
			input.setAttribute( 'value', card[ index ] );
			form.appendChild( input );
		};

		return form;
	};

	conekta.key = null;

	conekta.setKey = function( key ) {
		if( ! key || ! this.core )
			return;

		this.key = key;
		this.core.setPublishableKey( this.key );
	};

	return conekta;
} ] );

app.controller( 'PayController', [ '$scope', 'conekta', function( $scope, conekta ) {
	// Test
	$scope.card = {
		"exp_month":	10,
		"exp_year":		2020,
		"cvc":			123,
		"name":			"Gustavo Martínez",
		"number":		4242424242424242
	};

	$scope.pay = function( card ) {
		conekta.setKey( 'key_EX5tDNZsHefNFxubjkyEddw' );
		conekta.core.token.create( conekta.generate( card ), function( response ) {
			$scope.card.token = response.id;
			console.log( $scope.card.token )
		}, function( error ) {} );
	};
} ] );