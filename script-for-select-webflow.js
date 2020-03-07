/*
Один мой знакомый попросил написать небольшой скрипт
На сайте его клиента есть select, который по плану нужно было стилизовать в соответствии с дизайном
Но через CSS больно сильно его не стилизуешь. Сайт он собрал на Webflow, там есть свой виджет Dropdown
Я пришел к решению, что можно его использовать наряду с select
Сам select будет скрытым, а скрипт будет парсить его options и заполнять Dropdown
При клике на элемент в Dropdown соответствующему тегу option присваивается атрибут selected
Плюс еще было пара небольших модификаций. 
Так при клике по ссылке конкретной услуги в Dropdown и select должен быть выбран соответвующий пункт.
*/

$(function(){
  let select = $(".select-field.w-select");
  let parent = select.closest('.div-block-11');
  let dropdown = parent.children('.dropdown.w-dropdown');
  let toggle = dropdown.children('.dropdown-toggle.w-dropdown-toggle').children('div');
  let nav = dropdown.children('.dropdown-list.w-dropdown-list');
  let options = select.find('option');
  let mainlinks = $('.link-main-serv');
  
  mainlinks.each(function(i){
    $(this).attr('data-index', i);
  });
  function dropdownFilling(nav, options, toggle){
    nav.html('');
    options.each(function(i){
      let value = $(this).val();
      let text = $(this).text();
      if(i === 0){
        toggle.text(text);
      }
      let html = '<a href="#" class="dropdown-link w-dropdown-link" tabindex="-1" role="menuitem" style="outline: currentcolor none medium;" data-value="'+value+'" data-index="'+i+'">'+text+'</a>';
      nav.append(html);
    });
  }
  dropdownFilling(nav, options, toggle);
  
  $(document).on('click', '.dropdown-link.w-dropdown-link', function(){
    let value = $(this).attr('data-value');
    let text = $(this).text();
    let index = $(this).attr('data-index');
    options[index].selected = true;
    toggle.text(text);
    $('.dropdown-link.w-dropdown-link').each(function(){
    	$(this).removeClass('active');
    });
    $(this).addClass('active');
    $('.dropdown-list').hide('w--open');
  });
  
  $('.dropdown.w-dropdown').click(function(){
  	$('.dropdown-list').toggle();
  });
  
  $(document).on('click', '.close-out', function(){
    clear();
  });
  
  $(document).on('click', '.close', function(){
    clear();
  });
  
  let navlinks = document.getElementsByClassName('dropdown-link');
  
  $(document).on('click', '.link-main-serv', function(){
    let index = Number($(this).attr('data-index'))+1;
    //let text = $(this).text();
    //toggle.text(text);
    toggle.text(options[index].text);
    if(navlinks[index].dataset.index == index){
      navlinks[index].className += ' active';
    }
    options[index].selected = true;
  });
  
  /*
  $('.btn-brif').each(function(i){
    $(this).attr('data-index', i);
  });
  */
  
  $(document).on('click', '.btn-brif', function(){
    let index = Number($(this).attr('data-index'))+1;
    if(index < $('.row-serv').length){
      brifBtn($(this), index);
    } else {
      clear();
    }
  });
  
  function brifBtn(obj, i){
    let text = obj.closest('.column-text').children('h3').text();

    [].forEach.call(navlinks, function(el) {
      el.classList.remove('active');
    });
    navlinks[i].className += ' active';
    //toggle.text(text);
    toggle.text(options[i].text);
    options[i].selected = true;
  }
  
  function clear(){
    dropdownFilling(nav, options, toggle);
    options[0].selected = true;
  }
  
});
