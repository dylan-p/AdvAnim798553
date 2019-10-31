function snakeClass(x, y){
    snakes.push(this);
    this.snakeLength = 0;


    this.scale = 0.6;
    this.velMag = 200;
    this.rotationSpeed = 40;

    this.sections = [];

    this.headPath = [];

    this.preferredDistance = 17 * this.scale;
    //add the head of the snake
    this.head = this.addSectionAtPosition(x,y);
    this.head.name = "head";
    this.head.snake = this;

    this.lastHeadPosition = new Phaser.Point(this.head.body.x, this.head.body.y);
    //add 30 sections behind the head
    this.initSections(30);

    this.onDestroyedCallbacks = [];
    this.onDestroyedContexts = [];
}

snakeClass.prototype = {
    /**
     * Give the snake starting segments
     * @param  {Number} num number of snake sections to create
     */
    initSections: function(num) {
        //create a certain number of sections behind the head
        //only use this once
        for (var i = 1 ; i <= num ; i++) {
            var x = this.head.body.x;
            var y = this.head.body.y + i * this.preferredDistance;
            this.addSectionAtPosition(x, y);
            //add a point to the head path so that the section stays there
            this.headPath.push(new Phaser.Point(x,y));
        }

    },
    /**
     * Add a section to the snake at a given position
     * @param  {Number} x coordinate
     * @param  {Number} y coordinate
     * @return {Phaser.Sprite}   new section
     */
    addSectionAtPosition: function(x, y) {

        this.snakeLength++;
        this.sectionGroup.add(sec);
        sec.sendToBack();
        sec.scale.setTo(this.scale);

        this.sections.push(sec);

        //add a circle body to this section
        sec.body.clearShapes();
        sec.body.addCircle(sec.width*0.5);

        return sec;
    },
    /**
     * Add to the queue of new sections
     * @param  {Integer} amount Number of sections to add to queue
     */
    addSectionsAfterLast: function(amount) {
        this.queuedSections += amount;
    },
    /**
     * Call from the main update loop
     */
    update: function() {
        var speed = this.speed;
        this.head.body.moveForward(speed);

        //remove the last element of an array that contains points which
        //the head traveled through
        //then move this point to the front of the array and change its value
        //to be where the head is located
        var point = this.headPath.pop();
        point.setTo(this.head.body.x, this.head.body.y);
        this.headPath.unshift(point);

        //place each section of the snake on the path of the snake head,
        //a certain distance from the section before it
        var index = 0;
        var lastIndex = null;
        for (var i = 0 ; i < this.snakeLength ; i++) {

            this.sections[i].body.x = this.headPath[index].x;
            this.sections[i].body.y = this.headPath[index].y;

            //hide sections if they are at the same position
            if (lastIndex && index == lastIndex) {
                this.sections[i].alpha = 0;
            }
            else {
                this.sections[i].alpha = 1;
            }

            lastIndex = index;
            //this finds the index in the head path array that the next point
            //should be at
            index = this.findNextPointIndex(index);
        }

        //continuously adjust the size of the head path array so that we
        //keep only an array of points that we need
        if (index >= this.headPath.length - 1) {
            var lastPos = this.headPath[this.headPath.length - 1];
            this.headPath.push(new Phaser.Point(lastPos.x, lastPos.y));
        }
        else {
            this.headPath.pop();
        }

        //this calls onCycleComplete every time a cycle is completed
        //a cycle is the time it takes the second section of a snake to reach
        //where the head of the snake was at the end of the last cycle
        var i = 0;
        var found = false;
        while (this.headPath[i].x != this.sections[1].body.x &&
        this.headPath[i].y != this.sections[1].body.y) {
            if (this.headPath[i].x == this.lastHeadPosition.x &&
            this.headPath[i].y == this.lastHeadPosition.y) {
                found = true;
                break;
            }
            i++;
        }
        if (!found) {
            this.lastHeadPosition = new Phaser.Point(this.head.body.x, this.head.body.y);
            this.onCycleComplete();
        }
    },
    /**
     * Find in the headPath array which point the next section of the snake
     * should be placed at, based on the distance between points
     * @param  {Integer} currentIndex Index of the previous snake section
     * @return {Integer}              new index
     */
    findNextPointIndex: function(currentIndex) {
        var pt = this.headPath[currentIndex];
        //we are trying to find a point at approximately this distance away
        //from the point before it, where the distance is the total length of
        //all the lines connecting the two points
        var prefDist = this.preferredDistance;
        var len = 0;
        var dif = len - prefDist;
        var i = currentIndex;
        var prevDif = null;
        //this loop sums the distances between points on the path of the head
        //starting from the given index of the function and continues until
        //this sum nears the preferred distance between two snake sections
        while (i+1 < this.headPath.length && (dif === null || dif < 0)) {
            //get distance between next two points
            var dist = Util.distanceFormula(
                this.headPath[i].x, this.headPath[i].y,
                this.headPath[i+1].x, this.headPath[i+1].y
            );
            len += dist;
            prevDif = dif;
            //we are trying to get the difference between the current sum and
            //the preferred distance close to zero
            dif = len - prefDist;
            i++;
        }

        //choose the index that makes the difference closer to zero
        //once the loop is complete
        if (prevDif === null || Math.abs(prevDif) > Math.abs(dif)) {
            return i;
        }
        else {
            return i-1;
        }
    }
}
