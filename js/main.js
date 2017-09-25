
$.fn.extend({
    Waterfall: function() {
        $('.loading').removeClass('none');
        var $this = this;
        var father = $this.parent()


         function place () {
              var defereds = [];
              $this.find('img').each(function(){
                    var defer = $.Deferred();
                    //当每个图片加载完成后，执行 resolve
                   /* console.log($(this))
                    console.log(defer)*/
                    $(this).on('load', function(){
                        console.log('load')
                        defer.resolve();
                    });
                    /*document.getElementsByTagName('img').onload = function(){
                        console.log('load')
                        defer.resolve();
                    }*/
                   /* console.log(defer)*/
                    defereds.push(defer);
                });
                $.when.apply(null, defereds)
                      .done(function() {
                        render()
                     })
         }
        

        function render() {
            var nodeWidth = $this.outerWidth(true),
                colNum = parseInt($(window).width()/nodeWidth),
                colSumHeight = [];
                


            for(var i = 0; i < colNum; i++){
                colSumHeight.push(0);
            }

           


                 $this.each(function(){
                    var $cur = $(this); 
                    var idx = 0,
                        minSumHeight = colSumHeight[0];

                    for(var i = 0; i < colSumHeight.length; i++){
                        if(colSumHeight[i] < minSumHeight){
                            idx = i;
                            minSumHeight = colSumHeight[i];
                        }
                    }

                    $cur.css({
                        left: nodeWidth * idx,
                        top: minSumHeight
                    })

                    colSumHeight[idx] += $cur.outerHeight(true);
                }); 
            
            
                var maxHeight = Math.max.apply(null, colSumHeight);
                father.css({
                    height: maxHeight,
                    width: nodeWidth * colNum
                })
                
                $('.loading').addClass('none');

        }
        place()

        $(window).on('resize', function(){
            render();
        })
    }
})