/*
esteban@attitude.cl
Copyright under The MIT License (MIT) http://opensource.org/licenses/MIT
 */
jQuery.noConflict();

jQuery( document ).ready(function( $ ) {
    //Direccion actual
    var currentDomain = window.location.host;
    var currentPath   = window.location.pathname;

    //eBay
    if(currentDomain.indexOf('ebay.com') > -1) {
        //Tracking number en el historial de compras v2
        if(currentPath.indexOf('eBayISAPI') > -1) {
            var trackingLoopPurchaseHistory = setInterval(function(){
                $("div[id^='track_']").each(function() {
                    var trackingNumber = $(this).children('.g-v33:eq(1)').text().trim();
                    var trackingNext   = $(this).next('.seguimientowrap').attr('data-tracking');
                    $(this).children('.g-v33:eq(1)').next('a').attr('data-tracking', trackingNumber);

                    //if(!$('#seguimientoCorreos_'+trackingNumber).length) { //Dos envios con el mismo número, evitan que se cree uno nuevo al lado de cada número de tracking con esta condición
                    //Si el número de tracking que encontramos a continuación no es el trackign de este loop, entonces creamos el link
                    if(trackingNext != trackingNumber && trackingNumber != '--') {
                        $(this).after(' <div class="seguimientowrap" data-tracking="'+trackingNumber+'"><a href="http://www.correos.cl/SitePages/seguimiento/seguimiento.aspx?envio='+trackingNumber+'" class="seguimientoCorreos" id="seguimientoCorreos_'+trackingNumber+'" data-tracking="'+trackingNumber+'" target="_blank">Seguimiento en Correos.cl</a></div>');
                    }
                });
            }, 1000);
        }

        //Tracking en el historial de compras v1
        //.tracking-label>a.iframe-modal
        if(currentPath.indexOf('PurchaseHistory') > -1) {
            var trackingLoopPurchaseHistory = setInterval(function(){
                $('.tracking-label>a.iframe-modal').each(function(){
                    var trackingNumber = $(this).text();
                    var trackingNext   = $(this).next('.seguimientoCorreos').attr('data-tracking');

                    //Fix Tracking Number
                    trackingNumber = trackingNumber.replace('Tracking number', '');
                    trackingNumber = trackingNumber.replace('Número de seguimiento', '');

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
        if(currentPath.indexOf('FetchOrderDetails') > -1) {
            var trackingLoopOrderDetails = setInterval(function(){
                $('span[data-ng-show*="package.deliveryInfo.trackingNumber"]').each(function(){
                    var trackingNumber = $(this).text();
                    var trackingNext   = $(this).next('.seguimientoCorreos').attr('data-tracking');

                    //Fix Tracking Number
                    trackingNumber = trackingNumber.replace('Tracking number', '');

                    if(!$('#seguimientoCorreos_'+trackingNumber).length) {
                        $(this).after(' // <a href="http://www.correos.cl/SitePages/seguimiento/seguimiento.aspx?envio='+trackingNumber+'" class="seguimientoCorreos" id="seguimientoCorreos_'+trackingNumber+'" data-tracking="'+trackingNumber+'" target="_blank">Seguimiento en Correos.cl</a>');
                    }
                });
            }, 1000);
        }
    }

    //Aliexpress
    if(currentDomain.indexOf('aliexpress.com') > -1) {
        //Tracking number en los detalles de la orden de compra
        //.shipping-bd>.no
        if(currentPath.indexOf('order_detail') > -1) {
            var trackingNumber = $('.shipping-bd>.no').text();
            var sentThrough    = $('.logistics-name:first').text().toLowerCase();

            //Solo correos.cl, NO si:
            //.logistics-name = dhl, fedex, tnt, ups
            if(sentThrough.indexOf('dhl') == -1 && sentThrough.indexOf('fedex') == -1 && sentThrough.indexOf('tnt') == -1 && sentThrough.indexOf('ups') == -1) {
                $('.shipping-bd>.no').html(trackingNumber+'<br/><a href="http://www.correos.cl/SitePages/seguimiento/seguimiento.aspx?envio='+trackingNumber+'" class="seguimientoCorreos" id="seguimientoCorreos_'+trackingNumber+'" data-tracking="'+trackingNumber+'" target="_blank">Seguimiento en Correos.cl</a>');
            }

            //DHL
            if(sentThrough.indexOf('dhl') > -1) {
                $('.shipping-bd>.no').html(trackingNumber+'<br/><a href="http://www.dhl.cl/content/cl/es/express/rastreo.shtml?brand=DHL&AWB='+trackingNumber+'" class="seguimientoCorreos" id="seguimientoCorreos_'+trackingNumber+'" data-tracking="'+trackingNumber+'" target="_blank">Seguimiento en DHL.cl</a>');
            }

            //FedEx
            if(sentThrough.indexOf('fedex') > -1) {
                $('.shipping-bd>.no').html(trackingNumber+'<br/><a href="http://www.fedex.com/fedextrack/html/index.html?tracknumbers='+trackingNumber+'" class="seguimientoCorreos" id="seguimientoCorreos_'+trackingNumber+'" data-tracking="'+trackingNumber+'" target="_blank">Seguimiento en FedEx.com</a>');
            }
        }
    }
});
