
function updateScores(){
    ///// read local storage user data
    arrOfObjects=[]
    for (var i=0;i<5;i++){
        var user=localStorage.getItem("username"+i)
        var score=parseInt(localStorage.getItem("userScore"+i))
        if (!score){score=0}
        arrOfObjects.push({"name":user,"numb":score})
    }
    //////////////////////////////////////////////////////////////
    //////// read cuurent data to be checked
    var currentScore=parseInt(localStorage.getItem("currentScore"))
    var currentUser=localStorage.getItem("currentUser")
    //////////////////////////////////////////////////////
    /////// insert new score data if higher than existing score
    var found=false
    var setArr=[]
    i=0
    while (i!=5){
        if (currentScore>arrOfObjects[i]["numb"] && found==false){
            found=true
            setArr.push({"name":currentUser,"numb":currentScore})
        }
        else{
			if  (currentScore==arrOfObjects[i]["numb"] && currentUser==arrOfObjects[i]["name"])
			{i++;continue}
			else
			{
				setArr.push(arrOfObjects[i])
			i++}
		}

    }
    //////////////////////////////////////////////////////////////////////////
    /////// update the new data in local storage
    for (var i=0;i<5;i++){
        localStorage.setItem("username"+i,setArr[i]["name"])
        localStorage.setItem("userScore"+i,setArr[i]["numb"])
    }
    //////////////////////////////////////////////////////////////////////////
    for (var i=0;i<5;i++){
        localStorage.getItem("username"+i),localStorage.getItem("userScore"+i)
    }
}
updateScores()