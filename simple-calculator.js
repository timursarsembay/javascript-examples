/*
https://concord-lp.webflow.io/forma
*/

jQuery(document).ready(function($){
  $('.quantity').val(1);
  $('.quantity').change(function(){
    var val = $(this).val();
    if(!(val >= 1)){
    	$(this).val('1');
    }else{
      calc();
    }    
  });
  function calc(){
    var quantity = parseInt($('.quantity').val());
    if(quantity){
      var totalsum1year = Math.round(168750 + (33750 * quantity));
      var price1year = Math.round(totalsum1year / quantity);
      $('.price-li-1y').html(numberWithSpaces(totalsum1year));
      $('.price-connect-1').html(numberWithSpaces(price1year));

      var totalsum2year = Math.round(209000 + (47990 * quantity));
      var price2year = Math.round((totalsum2year / quantity) / 2);
      var discount2year = Math.round((1 - (totalsum2year / (totalsum1year * 2)))*100);
      $('.price-li-2y').html(numberWithSpaces(totalsum2year));
      $('.price-connect-2').html(numberWithSpaces(price2year));
      $('.discount-2y').html(discount2year);

      var totalsum5years = Math.round(418000 + (95980 * quantity));
      var price5years = Math.round((totalsum5years / quantity) / 5);
      var discount5years = Math.round((1 - (totalsum5years / (totalsum1year * 5)))*100);
      $('.price-li-5y').html(numberWithSpaces(totalsum5years));
      $('.price-connect-3').html(numberWithSpaces(price5years));
      $('.discount-5y').html(discount5years); 
    }   
  }
  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  calc();
});
