/*
esteban@attitude.cl
Copyright under The MIT License (MIT) http://opensource.org/licenses/MIT
 */

jQuery.noConflict();

jQuery( document ).ready(function( $ ) {
    //Direccion actual
    var currentUrl = window.location.pathname;

    //Tracking number en el historial de compras
    //.tracking-label>a.iframe-modal
    if(currentUrl.indexOf('PurchaseHistory') > -1) {
        var trackingLoopPurchaseHistory = setInterval(function(){
            $('.tracking-label>a[title="Tracking number"]').each(function(){
                var trackingNumber = $(this).text();
                var trackingNext = $(this).next('.seguimientoCorreos').attr('data-tracking');

                //if(!$('#seguimientoCorreos_'+trackingNumber).length) { //Dos envios con el mismo número, evitan que se cree uno nuevo al lado de cada número de tracking con esta condición
                //Si el número de tracking que encontramos a continuación no es el trackign de este loop, entonces creamos el link
                if(trackingNext != trackingNumber) {
                    $(this).after(' // <a href="http://www.correos.cl/SitePages/seguimiento/seguimiento.aspx?envio='+trackingNumber+'" class="seguimientoCorreos" id="seguimientoCorreos_'+trackingNumber+'" data-tracking="'+trackingNumber+'" target="_blank">Seguimiento en Correos.cl</a>');
                }
            });
        }, 1000);
    }

    //Tracking number en el detalle de una compra
    //span data-ng-show="package.deliveryInfo.trackingNumber != null && package.deliveryInfo.trackingNumber != ''
    if(currentUrl.indexOf('FetchOrderDetails') > -1) {
        var trackingLoopOrderDetails = setInterval(function(){
            $('span[data-ng-show*="package.deliveryInfo.trackingNumber"]').each(function(){
                var trackingNumber = $(this).text();
                console.log(trackingNumber);
                var trackingNext = $(this).next('.seguimientoCorreos').attr('data-tracking');

                if(!$('#seguimientoCorreos_'+trackingNumber).length) {
                    $(this).after(' // <a href="http://www.correos.cl/SitePages/seguimiento/seguimiento.aspx?envio='+trackingNumber+'" class="seguimientoCorreos" id="seguimientoCorreos_'+trackingNumber+'" data-tracking="'+trackingNumber+'" target="_blank">Seguimiento en Correos.cl</a>');
                }
            });
        }, 1000);
    }
});