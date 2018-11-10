
var topicsArray = []

makeButton("islands")
makeButton("steelers")
makeButton("mario")

$("#add-animal").on("click",function(event){
    event.preventDefault();
    
    var input = $("#animal-input").val()
    makeButton(input)

    
})


function makeButton(input){

        if(input === ""){
            return
        }
        console.log (input)
        for(i=0; i<topicsArray.length; i++){

            if(topicsArray[i].toLowerCase() === input.toLowerCase()){
                return
            }

        }
        topicsArray.push(input)
        console.log(topicsArray)

        var animal = $("<button>")

        $(animal).text(input)
        $(animal).attr("data-animal",input)
        $("#buttonDiv").append(animal)

        $(animal).on("click",function(){
            $("#animals-view").empty()
            var key = $(this).attr("data-animal")
            $.ajax({
                url : "https://api.giphy.com/v1/gifs/search?&q=" + key + "&api_key=dc6zaTOxFJmzC&limit=10",
                method: "GET"

            }).then(function(response){
                console.log(response)
                for(i=0; i<10; i++){
                    var imageUrl = response.data[i].images.fixed_height_still.url
                    var newGif = $("<img>")
                    $("#animals-view").prepend(newGif).prepend($("<p>").text("Rating: " +response.data[i].rating)).prepend("<br>")
                    $(newGif).attr("src",imageUrl)
                    $(newGif).attr("data_still", response.data[i].images.fixed_height_still.url)
                    $(newGif).attr("data_animate",response.data[i].images.fixed_height.url)
                    $(newGif).attr("data_state", "still")    
                    

                    $(newGif).on("click",function(){
                        var animate = $(this).attr("data_animate")
                        var still = $(this).attr("data_still")
                        var source = $(this).attr("data_state")
                        if (source === "still"){
                            $(this).attr("src", animate)
                            $(this).attr("data_state","animate") 
                            //console.log ("source", source)
                            return
                        }
                        if( source === "animate"){
                            //console.log ("its working")
                            $(this).attr("src", still)
                            $(this).attr("data_state","still")  
                            return
                        }

                    })

                }
                
            })
        })
}
