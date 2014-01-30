$(function() {

  var $responseBar = $(".response-bar");

  $("#submit-form").submit(function(event) {

      event.preventDefault();

      var $form = $(this),
          actionURL = $form.attr('action'),
          formData = $form.serialize();


      $.ajax({
          url: actionURL,
          type: "POST",
          data: formData,
          beforeSend: function() {
              $form.addClass('processing');
              console.log($form.find(".button"))
              $form.find(".button").attr('disabled', true);
          },
          complete: function(jqXHR, status) {
              $responseBar.find('.response-text').html(jqXHR.responseText);
              $responseBar.addClass('show');
              //console.log("complete")
              //console.log("jqxr: ", jqXHR, " , status: ", status)
              //console.log('responseText: ', jqXHR.responseText);
              $form.removeClass('processing');
              $form.find(".button").removeAttr('disabled', false);

          },
          success: function(e) {
            $responseBar.removeClass('error').addClass('success');
            //console.log("success")
            //$("#main").load("/ #main");
          },
          error: function(jqXHR, textStatus, errorThrown) {
              $responseBar.removeClass('success').addClass('error');
              //console.log("error")
              //console.log("jqXHR: ", jqXHR);
              //console.log("textStatus: ", textStatus);
              //console.log("errorThrown: ", errorThrown);
              //console.log("error: " + textStatus.responseText)
          }
       });
  });


  var $addProject = $('[data-add-project]'),
    $modalTarp = $('.modal-tarp'),
    $projectModal = $('.add-project'),
    $cancelProject = $('[data-cancel-project]'),
    fadeSpeed = 200;

  var closeModal = function() {
    $modalTarp.fadeOut(fadeSpeed);
    $projectModal.removeClass('modal-open');
    $responseBar.removeClass('show');
  }

  // Fade out button, fade in add project instructions
  $addProject.on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $modalTarp.fadeIn(fadeSpeed);
    $projectModal.addClass('modal-open');
  });

  // Fade out project instruction, fade in button
  $cancelProject.on('click', function(e) {
    e.preventDefault();
    closeModal();
  });

  // Clear search icon on small devices
  $('.sache-search').on('click', function(e) {
    if ($(window).width() < 768) {
      e.stopPropagation();
      $(this).addClass('clicked');
      $(this).children('input').focus();
    }
  });

  $('body').on('click', function(e) {

    if ($('.sache-search').hasClass('clicked')) {
      $('.sache-search').removeClass('clicked');
    }

    if ($modalTarp.is(':visible')) {
      if ($(e.target).is('.modal-tarp')) {
        closeModal();
      }
    }
  });

  // Esc functions
  $(document).keyup(function(e) {
    if ($modalTarp.is(':visible')) {
      if (e.keyCode == 27) { // esc
        closeModal();
      }
    }
  });

  //$(document).pjax('a[data-pjax]', '#pjax-container')

});
