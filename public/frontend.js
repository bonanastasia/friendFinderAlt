$(document).ready(function() {
    console.log("friends.js is linked and ready!");


    let bestDiff = 41;
    let bestFriend;
    let currentDiff = 41;

    $.ajax({
        url: "/api/friends",
        method: "GET"
    }).done(function(res) {
        console.log(res); //logging it to parse through it

        //delete old data from the table to avoid duplicates.
        $('#match-name').html('');
        $('#match-location').html('');
        $('#match-hobbies').html('');

        //placeholder value to hold our upcoming friend info.
        var dataToInsert = "";
        //identify user entry from post method in routes


        let user = res.length - 1;
        let userArr = res[user].scores.split(",");
        console.log("I'm the user array! " + userArr);


        //loop through friends in database
        for (var i = 1; i < (res.length - 1); i++) {

            let currentArr = res[i].scores.split(",");
            console.log("I'm the currentArray! " + currentArr);
            // call evalFriend() to the friend in the database at [i]
            evalDiff(currentArr, userArr);
            //console.log(res[i].name);
            // if the current total diff < best total diff, reset the best and the best friend index with current
            if (currentDiff < bestDiff) {
                bestFriend = res[i];
                console.log("NEW BFF is" + bestFriend);
                bestDiff = currentDiff;
            }

            //console.log("Best friend is" + res[i].name);
        } //end of first friend loop
        //console.log("the best diff is " + bestDiff + " and the best friend is " + bestFriend);
        sendData();
    }); //end .done



    function evalDiff(arr1, arr2) {

        if (arr1.length !== arr2.length) {
            throw new Error("arrays not same length");
        }
        let total = 0;
        const length = arr1.length;
        for (var i = 0; i < length; i++) {
            total += Math.abs(arr1[i] - arr2[i]);
        }
        console.log("I'm the total difference: " + total);
        currentDiff = total;
        return total;
    }

    function sendData() {
        $('#match-image').attr('src', "http://" + bestFriend.photo);
        console.log(bestFriend.photo);
        $('#match-name').html(bestFriend.name);
        $('#match-location').html(bestFriend.location);
        $('#match-hobbies').html(bestFriend.hobbies);

        console.log(bestFriend.name);
    }

}); //end of document ready
