$(function(){
    $('.del').click(function(e){
        var target = $(e.target)
        var id = target.data('id')
        var tr = $('.item-id-'+id)
        $.ajax({
            type:"DELETE",
            url:'/admin/movie/list?id='+ id
        }).done(function(res){
            if(res.success ===1){
                if(tr.length>0){
                    tr.remove()
                }
            }
        })
    })
    $('#douban').blur(function(){
        var douban = $(this)
        var id = douban.val()
        console.log(id)
        if(id){
            $.ajax({
                url:'https://api.douban.com/v2/movie/subject/'+id,
                cache:true,
                type:'GET',
                dataType:'jsonp',
                crossDomain:true,//跨域,
                jsonp:'callback',
                success:function(res){
                    console.log(res)
                    $('#inputTitle').val(res.title)
                    $('#inputDoctor').val(res.directors[0].name)
                    $('#inputCountry').val(res.countries[0])
                    $('#inputPoster').val(res.images.large)
                    $('#inputYear').val(res.year)
                    $('#inputSummary').val(res.summary)
                }
            })
        }
    })
})