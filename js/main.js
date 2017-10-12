
$.fn.extend({
    Waterfall: function() {
        $('.loading').removeClass('none');
        $('.content').removeClass('show');
        $('.item').removeClass('show');
        var $this = this;
        var father = $this.parent()


         function place () {
              var defereds = [];
              console.log($this.length)
              $this.find('img').each(function(){
                    var defer = $.Deferred();
                    //当每个图片加载完成后，执行 resolve
                    $(this).on('load', function(){
                        defer.resolve();
                    });
                    defereds.push(defer);
                });
                const timer = setTimeout(function() {
                    console.log('超时了')
                    render()
                }, 3000)
                $.when.apply(null, defereds)
                      .done(function() {
                        render()
                        clearTimeout(timer)
                     })
                
         }
        

        function render() {
            var nodeWidth = $this.outerWidth(true),
                colNum = parseInt($(window).width()/nodeWidth),
                colSumHeight = [];
                


            for(var i = 0; i < colNum; i++){
                colSumHeight.push(0);
            }

           


                 $this.each( function() {
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

                    $cur.removeClass('noMr');
                    
                    if((idx + 1) % colNum === 0) {
                        $cur.addClass('noMr');
                    }

                    colSumHeight[idx] += $cur.outerHeight(true);
                }); 
            
            
                var maxHeight = Math.max.apply(null, colSumHeight);
                father.css({
                    height: maxHeight,
                    width: nodeWidth * colNum - 20
                })
                
                $('.loading').addClass('none');
                $('.content').addClass('show');
                $('.item').addClass('show');

        }
        place()

        $(window).on('resize', function(){
            render();
        })
    }
})