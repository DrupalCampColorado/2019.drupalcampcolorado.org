/**
 * @file
 * JavaScript behaviors for RateIt integration.
 */

(function ($, Drupal) {

  'use strict';

  // All options can be override using custom data-* attributes.
  // @see https://github.com/gjunge/rateit.js/wiki#options.

  /**
   * Initialize rating element using RateIt.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformRating = {
    attach: function (context) {
      if (!$.fn.rateit) {
        return;
      }

      $(context)
        .find('[data-rateit-backingfld]')
        .once('webform-rating')
        .each(function () {
          var $rateit = $(this);
          var $input = $($rateit.attr('data-rateit-backingfld'));

          // Rateit only initialize inputs on load.
          if (document.readyState === 'complete') {
            $rateit.rateit();
          }

          // Update the RateIt widget when the input's value has changed.
          // @see webform.states.js
          $input.on('change', function () {
            $rateit.rateit('value', $input.val());
          });

          // Set RateIt widget to be readonly when the input is disabled.
          // @see webform.states.js
          $input.on('webform:disabled', function () {
            $rateit.rateit('readonly', $input.is(':disabled'));
          });
        });
    }
  };

})(jQuery, Drupal);
;
/**
 * @file
 * Defines Javascript behaviors for the commerce cart module.
 */

(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.commerceCartBlock = {
    attach: function (context) {
      var $context = $(context);
      var $cart = $context.find('.cart--cart-block');
      var $cartButton = $context.find('.cart-block--link__expand');
      var $cartContents = $cart.find('.cart-block--contents');

      if ($cartContents.length > 0) {
        // Expand the block when the link is clicked.
        $cartButton.once('cart-button-processed').on('click', function (e) {
          // Prevent it from going to the cart.
          e.preventDefault();
          // Get the shopping cart width + the offset to the left.
          var windowWidth = $(window).width();
          var cartWidth = $cartContents.width() + $cart.offset().left;
          // If the cart goes out of the viewport we should align it right.
          if (cartWidth > windowWidth) {
            $cartContents.addClass('is-outside-horizontal');
          }
          // Toggle the expanded class.
          $cartContents
            .toggleClass('cart-block--contents__expanded')
            .slideToggle();
        });
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
;
