//listing page menu
;(function(){
   var boardTitleNum = $('.board-block__title-page-num');
   var list_counter = 0;
   var intervalTimer_id = null;

   function randomizer(min,max){
      return Math.floor( Math.random() * (max - min + 1) ) + min;
   }

   //Сборка и активация меню
   function initializeMenu(){
      var indexesArray = [];

      //Свойство - очистить активы
      initializeMenu.clearActive = function( data_type ){
         if( !arguments.length ){
            $('.board-block *').removeClass('active');
         }
         else {
            $('[data-type="'+data_type+'"]').removeClass('active');
         }
      };

      //Свойство - задать актив по клику
      initializeMenu.setActive = function( event ){
         initializeMenu.autoPlayer().stopPlay();

         //Клик по верхнему меню
         if( $( event.target.closest('ul') ).hasClass('board-menu') ){
            list_counter = 0;
            //Ошибка - если ткнул не туда
            if( event.target.closest('li') == null ) return;

            $( event.target.closest('ul') ).find('li').removeClass('active');
            $( event.target.closest('li') ).addClass('active');
            initializeMenu.updateData();

            //Переключение подменю
            $('.board-bottom-list, .board-bottom-list__list-item').removeClass('active');
            $('.board-bottom-list[data-type="'+indexesArray[0]+'"]').addClass('active');
            $('.board-bottom-list.active li:first').addClass('active');
            initializeMenu.updateData();
            initializeMenu.updatePriceList();
         }//Клик по верхнему меню

         //Клик по подменю
         if( $( event.target.closest('ul') ).hasClass('board-bottom-list') ){
            list_counter = 0;
            //Ошибка - если ткнул не туда
            if( event.target.closest('li') == null ) return;

            $('.board-bottom-list__list-item').removeClass('active');
            $( event.target.closest('ul') ).find('li').removeClass('active');
            $( event.target.closest('li') ).addClass('active');
            initializeMenu.updateData();

            initializeMenu.updatePriceList();
         }
      };//Клик по подменю

      //Пошаговое отображение элементов
      initializeMenu.buildStruct = function(){
         //Шаг 1 - главное меню
         $('.board-menu__list-item').eq(0).addClass('active');

         //Шаг 2 - под-меню
         $('.board-bottom-list').eq(0).addClass('active');
         $('.board-bottom-list__list-item').eq(0).addClass('active');

         //Шаг 3 - цены
         $('.food-list-menu').eq(0).addClass('active');

         initializeMenu.updateData();
      }//Пошаговое отображение элементов

      //Случайная расстановка активов
      initializeMenu.buildRandomStruct = function(){
         list_counter = 0;
         var topMenu_ln = $('.board-menu__list-item').length-1;
         
         initializeMenu.clearActive();

         //Шаг 1 - главное меню
         $('.board-menu__list-item')
            .eq( randomizer(0, topMenu_ln) )
            .addClass('active');

         initializeMenu.updateData();

         //Шаг 2 - под-меню
         $('.board-bottom-list[data-type='+indexesArray[0]+']')
            .addClass('active');

         //Шаг 2.1 - случайный пункт
         $('.board-bottom-list.active li')
            .eq( randomizer(0, $('.board-bottom-list.active li').length - 1) )
            .addClass('active');

         initializeMenu.updateData();
         initializeMenu.updatePriceList();
      }//Случайная расстановка активов

      //Автолисталка
      initializeMenu.autoPlayer = function(){
         //Ошибка - скип ошибки если не задан евент.
         if(event){
            if( event.type == 'mouseover' ){stopPlay()};
            if( event.type == 'mouseout' ){startPlay()};
         }
         
         function startPlay(interval){
            if(!arguments.length){interval = 3000};
            intervalTimer_id = setInterval(initializeMenu.buildRandomStruct, interval);
         }
         
         function stopPlay(){
            clearInterval(intervalTimer_id);
         }
         
         //Доступно внешнее управление
         return {
            startPlay: startPlay,
            stopPlay: stopPlay,
         }
      }//Автолисталка

      //Обновление изменённых данных
      initializeMenu.updateData = function(){
         indexesArray.length = 0;
         indexesArray.push( $('.board-menu__list-item.active').attr('data-type') );
         indexesArray.push( $('.board-bottom-list.active').attr('data-type') );
         indexesArray.push( $('.board-bottom-list__list-item.active').attr('data-type') );
         
         var title = $('.board-bottom-list__list-item.active').text();
         var pages = $('[data-type='+indexesArray[2]+']').length - 1;
         
         boardTitleNum.text( title+' '+(list_counter+1)+' / '+pages );
      }//Обновление изменённых данных

      //Обновить список цен
      initializeMenu.updatePriceList = function(){
         $('.food-list-menu').removeClass('active');
         $('.food-list-menu[data-type="'+indexesArray[2]+'"]:first').addClass('active');
      }

      //Рычаги листания ценового меню
      initializeMenu.listButton = function(){
         var currCategory_ln = $('.food-list-menu[data-type="'+indexesArray[2]+'"]').length;

         if( event ){
            if( $(event.target).hasClass('--left') ){ listButton_prev() }
            if( $(event.target).hasClass('--right') ){ listButton_next() }
         }

         function listButton_prev(){
            list_counter = (list_counter > 0) ? --list_counter : 0;
            update()
         }
         function listButton_next(){
            list_counter = (list_counter < currCategory_ln-1) ? ++list_counter : currCategory_ln-1;
            update()
         }

         function update(){
            currCategory_ln = $('.food-list-menu[data-type="'+indexesArray[2]+'"]').length;
            //Чищу класс
            $('.food-list-menu[data-type="'+indexesArray[2]+'"]')
               .removeClass('active');
                     
            $('.food-list-menu[data-type="'+indexesArray[2]+'"]')
               .eq(list_counter)
               .addClass('active');

            initializeMenu.updateData();
         }

         //Доступно внешнее управление
         return {
            listButton_prev: listButton_prev,
            listButton_next: listButton_next,
         }
      }//Рычаги листания ценового меню

      initializeMenu.clearActive();
   }//Сборка и активация меню

   initializeMenu();
   initializeMenu.buildStruct();
   //initializeMenu.autoPlayer().startPlay();

   $('.board-block').on('click', initializeMenu.setActive);
   $('.board-block').on('mouseenter mouseleave', initializeMenu.autoPlayer);
   $('.board-block-navigation__EVENT').on('click', initializeMenu.listButton);

   //Внешнее управление
   return A_MENU_LIST_OUTERCONTROL = {
      randomizer: randomizer,
      startAutoplay: initializeMenu.autoPlayer().startPlay,
      stopAutoplay: initializeMenu.autoPlayer().stopPlay,
      listButtonPrev: initializeMenu.listButton().listButton_prev,
      listButtonNext: initializeMenu.listButton().listButton_next,
      updateData: initializeMenu.updateData,
   }
})();//listing page menu