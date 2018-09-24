$(document).ready(function () {
    $(document).on("click", ".modal-close", function () {
        $(".modal-2").hide();
        $(".overlay").hide();
    })
    const game = {
        words: ['crow', 'jay', 'oriole', 'robin', 'pelican', 'puffin', 'eagle', 'pigeon', 'kingfisher', 'vulture', 'chickadee', 'condor', 'gnatcatcher', 'hummingbird', 'duck', 'warbler', 'raven', 'hawk', 'cormorant', 'goose', 'partridge', 'grackle', 'roadrunner', 'grouse', 'owl', 'tanager', 'heron', 'wren', 'quail', 'dove', 'finch', 'osprey', 'nuthatch', 'booby', 'pheasant', 'spoonbill', 'sparrow', 'flycatcher', 'titmouse', 'gull', 'crane', 'turkey'],
        imageSources: ['./styles/images/American_Crow.jpg', './styles/images/Blue_Jay.jpg', './styles/images/Altamira_Oriole.jpg', './styles/images/American_Robin.jpg', './styles/images/American_White_Pelican.jpg', './styles/images/Atlantic_Puffin.jpg', './styles/images/Bald_Eagle.jpg', './styles/images/Band_Tailed_Pigeon.jpg', './styles/images/Belted_Kingfisher.jpg', './styles/images/Black_Vulture.jpg', './styles/images/Boreal_Chickadee.jpg', './styles/images/California_Condor.jpg', './styles/images/California_Gnatcatcher.jpg', './styles/images/Calliope_Hummingbird.jpg', './styles/images/Canvasback.jpg', './styles/images/Colima_Warbler.jpg', './styles/images/Common_Raven.jpg', './styles/images/Coopers_Hawk.jpg', './styles/images/Double_Crested_Cormorant.jpg', './styles/images/Emperor_Goose.jpg', './styles/images/Gray_Partridge.jpg', './styles/images/Great_Tailed_Grackle.jpg', './styles/images/Greater_Roadrunner.jpg', './styles/images/Greater_Sage_Grouse.jpg', './styles/images/Great_Horned_Owl.jpg', './styles/images/Hepatic_Tanager.jpg', './styles/images/Little_Blue_Heron.jpg', './styles/images/House_Wren.jpg', './styles/images/Mountain_Quail.jpg', './styles/images/Mourning_Dove.jpg', './styles/images/Black_Rosy_Finch.jpg', './styles/images/Osprey.jpg', './styles/images/Red_Breasted_Nuthatch.jpg', './styles/images/Red_Footed_Booby.jpg', './styles/images/Ring_Necked_Pheasant.jpg', './styles/images/Roseate_Spoonbill.jpg', './styles/images/Olive_Sparrow.jpg', './styles/images/Scissor_Tailed_Flycatcher.jpg', './styles/images/Tufted_Titmouse.jpg', './styles/images/Western_Gull.jpg', './styles/images/Whooping_Crane.jpg', './styles/images/Wild_Turkey.jpg'],
        chosenWord: "",
        check: "Press a key to Start.",
        correctCounter: 0,
        displayWord: [],
        wrongLetters: [],
        guesses: 7,
        wins: 0,
        losses: 0,

        chooseWord: function () {
            let randomNum = Math.floor(Math.random() * this.words.length);
            this.chosenWord = this.words[randomNum];
            this.correctCounter = this.chosenWord.length;
            return randomNum;
        },

        initializeDisplay: function () {
            let randomNum = this.chooseWord();
            this.check = "Press a key to Start.";
            this.displayWord.length = 0;
            this.wrongLetters.length = 0;
            for (let i = 0; i < this.chosenWord.length; i++) {
                this.displayWord.push("_");
            }
            $("#current-word").text(this.displayWord.join(" "));
            $("#wins").text(this.wins);
            $("#losses").text(this.losses);
            $("#guesses-left").text(this.guesses);
            this.guesses = 7;
            $("#wrong-letters").text(this.wrongLetters.join(" "))
            $("#check").text(this.check);
            $(".bird-image").attr("src", this.imageSources[randomNum])
        },

        handleGuess: function () {
            $(document).on("keypress", function (e) {
                $(".modal-1").hide();
                $(".modal-2").hide();
                $(".overlay").hide();

                if (e.which < 97 || e.which > 122) {
                    this.check = "Not a valid guess."
                    this.animateCheck();
                } else {

                    if (this.displayWord.indexOf(e.key) === -1) {
                        for (let i = 0; i < this.chosenWord.length; i++) {
                            if (this.chosenWord[i].indexOf(e.key) > -1) {
                                this.displayWord[i] = e.key;
                                this.correctCounter--;
                                this.check = "Correct!"
                                this.animateCheck();
                            }
                        }
                    }

                    if (this.chosenWord.indexOf(e.key) === -1) {

                        if (this.wrongLetters.indexOf(e.key) === -1) {
                            this.wrongLetters.push(e.key);
                            this.guesses--;
                            this.check = "Wrong!"
                            this.animateCheck();
                        }
                    }
                }

                $("#current-word").text(this.displayWord.join(" "));
                $("#wrong-letters").text(this.wrongLetters.join(" "));
                $("#guesses-left").text(this.guesses);
                $("#check").text(this.check);


            }.bind(this));

            $(document).on("keyup", function () {
                this.checkGuess();
                $("#check").removeClass("wrong");
                $("#check").removeClass("right");
            }.bind(this))
        },

        checkGuess: function () {
            if (this.guesses === 0) {
                $("#modal-header").text("You Lose!");
                $("#modal-answer").text(this.chosenWord);
                $(".modal-image").attr("src", "./styles/images/Tuco2.gif");
                $(".overlay").show();
                $(".modal-1").show();
                this.losses++
                this.initializeDisplay();
            } else if (this.correctCounter === 0) {
                $("#modal-header").text("You Win!");
                $("#modal-answer").text(this.chosenWord);
                $(".modal-image").attr("src", "./styles/images/Blondie.gif");
                $(".overlay").show();
                $(".modal-1").show();
                this.wins++;
                this.initializeDisplay();
            }
        },

        animateCheck: function () {
            switch (this.check) {
                case "Correct!": $("#check").addClass("right")
                    break;
                case "Wrong!": $("#check").addClass("wrong")
                    break;
                case "Not a valid guess.": $("#check").addClass("wrong")
                    break;
                default:
                    break;
            }
        },

        animateCorrect: function () {
        },

        initializeGame: function () {
            this.initializeDisplay();
            this.handleGuess();
        }

    }
    game.initializeGame();
})