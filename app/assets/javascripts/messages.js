$(function(){


  function buildMSG(msg) {
    var content = msg.content ? `<p class="messages__box__message">${ msg.content }</p>` : "";
    var img = msg.image ? `<img class="messages__box__image" src="${msg.image}"> `: "";
    var html = `<div class="messages__box">
                  <p class="messages__box__user-name">
                    ${msg.user_name}
                  </p>
                  <p class="messages__box__posted-time">
                    ${msg.created_at}
                  </p>
                  ${content}
                  ${img}
                  </div>`
     return html;
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(msg){
      var html = buildMSG(msg);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})
    })
    .fail(function(){
      aleart('error')
    })
    .always(function(){
      $('.form__input__send').prop('disabled', false)
    })
  })

});