/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.shape.basic.Label
 * Implements a simple text label.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var shape =  new draw2d.shape.basic.Label("This is a simple label");
 *          
 *     canvas.addFigure(shape,40,10);
 *     
 * @author Andreas Herz
 * 
 * @class draw2d.SetFigure
 */
draw2d.shape.basic.Label= draw2d.SetFigure.extend({

	NAME : "draw2d.shape.basic.Label",
    FONT_FALLBACK:  {
      'Georgia'            :'Georgia, serif',
      'Palatino Linotype'  :'"Palatino Linotype", "Book Antiqua", Palatino, serif',
      'Times New Roman'    :'"Times New Roman", Times, serif',
      'Arial'              :'Arial, Helvetica, sans-serif',
      'Arial Black'        :'"Arial Black", Gadget, sans-serif',   
      'Comic Sans MS'      :'"Comic Sans MS", cursive, sans-serif',    
      'Impact'             :'Impact, Charcoal, sans-serif',
      'Lucida Sans Unicode':'"Lucida Sans Unicode", "Lucida Grande", sans-serif',  
      'Tahoma, Geneva'     :'Tahoma, Geneva, sans-seri',
      'Trebuchet MS'       :'"Trebuchet MS", Helvetica, sans-serif',
      'Verdana'            :'Verdana, Geneva, sans-serif',
      'Courier New'        :'"Courier New", Courier, monospace',
      'Lucida Console'     :'"Lucida Console", Monaco, monospace'},
      

    /**
     * @constructor
     * Creates a new text element.
     * 
     * @param {String} [text] the text to display
     */
    init : function(text)
    {
        this._super();
        
        if(typeof text === "string"){
    		this.text = text;
    	}
    	else{
    		this.text = "";
    	}
    	// for performance reasons
        //
        this.cachedWidth  = null;
        this.cachedHeight = null;
        this.cachedMinWidth  = null;
        this.cachedMinHeight = null;
        
        // appearance of the shape
        //
        this.fontSize = 12;
        this.fontColor = new draw2d.util.Color("#080808");
        this.fontFamily = null;
        this.padding = 4;
        this.bold = false;
        
        
        // set some good defaults
        //
        this.setStroke(1);
        this.setDimension(10,10);

        // behavior of the shape
        //
        this.editor = null;
        
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    /** 
     * @method
     * Creates the shape object for a text node.
     * 
     * @template
     **/
    createSet : function()
    {
    	return this.canvas.paper.text(0, 0, this.text);
    },

    /**
     * @method
     * Trigger the repaint of the element and transport all style properties to the visual representation.<br>
     * Called by the framework.
     * 
     * @template
     **/
    repaint: function(attributes)
    {
        if(this.repaintBlocked===true || this.shape===null){
            return;
        }

 // PERFORMANCE     Problem. Warum muss der Cache bei jedem zeichnen gel�scht werden....?
 // Macht keinen Sinn. Andere L�sung muss her. 
 // Dummerweise zeichnen sich sonst die Labels nicht in der korrekte Breite
        this.cachedWidth=null;
        this.cachedHeight=null;
        this.cachedMinWidth=null;
        this.cachedMinHeight=null;

        // style the label
        var lattr = {};
        lattr.text = this.text;
        lattr.x = this.padding;
        lattr.y = this.getHeight()/2;
        lattr["font-weight"] = (this.bold===true)?"bold":"normal";
        lattr["text-anchor"] = "start";
        lattr["font-size"] = this.fontSize;
        if(this.fontFamily!==null){
            lattr["font-family"] = this.fontFamily;
        }
        lattr.fill = this.fontColor.hash();
        this.svgNodes.attr(lattr);

        this._super(attributes);
    },
    
    /**
     * @private
     */
    applyTransformation:function(){
        this.shape.transform(
                "R"+
                this.rotationAngle);
        this.svgNodes.transform(
                "R"+
                this.rotationAngle+
                "T" + this.getAbsoluteX() + "," + this.getAbsoluteY());
    },

    
    /**
     * @method
     * A Label is not resizeable. In this case this method returns always <b>false</b>.
     * 
     * @returns Returns always false in the case of a Label.
     * @type boolean
     **/
    isResizeable:function()
    {
      return false;
    },
       
    
    /**
     * @method
     * Set the new font size in [pt].
     *
     * @param {Number} size The new font size in <code>pt</code>
     **/
    setFontSize: function( size)
    {
      this.cachedMinWidth  = null;
      this.cachedMinHeight = null;
      this.fontSize = size;
      this.repaint();
    },
    

    /**
     * @method
     * Set the label to <b>bold</b> or <b>normal</b> font weight.
     *
     * @param {Boolean} bold The bold flag for the label
     * @since 2.4.1
     **/
    setBold: function( bold)
    {
      this.cachedMinWidth  = null;
      this.cachedMinHeight = null;
      this.bold = bold;
      this.repaint();
    },
    
    
    /**
     * @method
     * Set the color of the font.
     * 
     * @param {draw2d.util.Color/String} color The new color of the line.
     **/
    setFontColor:function( color)
    {
      this.fontColor = new draw2d.util.Color(color);
      this.repaint();
    },

    /**
     * @method
     * The current used font color
     * 
     * @returns {draw2d.util.Color}
     */
    getFontColor:function()
    {
      return this.fontColor;
    },
    
    /**
     * @method
     * Set the padding of the element
     *
     * @param {Number} padding The new padding
     **/
    setPadding: function( padding)
    {
      this.cachedMinWidth  = null;
      this.cachedMinHeight = null;
      this.cachedWidth=null;
      this.cachedHeight=null;
      this.padding = padding;
      this.repaint();
    },
    
    /**
     * @method
     * Set the font family to use. If you use the <b>bold</b> font names the typical fallback 
     * font are installed as well.
     * 
     * <b>Serif Fonts</b>
     * <ul>
     *  <li><b>Georgia</b>, serif   </li>
     *  <li><b>Palatino Linotype</b>, "Book Antiqua", Palatino, serif    </li>
     *  <li><b>Times New Roman</b>, Times, serif  </li>   
     * </ul>
     * 
     * <b>Sans-Serif Fonts</b>
     * <ul>
     *  <li><b>Arial</b>, Helvetica, sans-serif   </li> 
     *  <li><b>Arial Black</b>, Gadget, sans-serif </li>  
     *  <li><b>Comic Sans MS</b>, cursive, sans-serif   </li> 
     *  <li><b>Impact, Charcoal</b>, sans-serif   </li> 
     *  <li><b>Lucida Sans Unicode</b>, "Lucida Grande", sans-serif </li> 
     *  <li><b>Tahoma, Geneva</b>, sans-serif  </li>
     *  <li><b>Trebuchet MS</b>, Helvetica, sans-serif </li>  
     *  <li><b>Verdana</b>, Geneva, sans-serif   </li>  
     * </ul>
     * 
     * <b>Monospace Fonts</b>
     * <ul>
     *  <li><b>Courier New</b>, Courier, monospace   </li>
     *  <li><b>Lucida Console</b>, Monaco, monospace</li>
     * </ul>
     *
     * @param {String} font The font to use
     **/
    setFontFamily: function( font)
    {
      this.cachedMinWidth  = null;
      this.cachedMinHeight = null;
      this.cachedWidth=null;
      this.cachedHeight=null;
      
      // check for fallback
      //
      if((typeof font!=="undefined") && font!==null && typeof this.FONT_FALLBACK[font] !== "undefined"){
          font=this.FONT_FALLBACK[font];
      }
      
      this.fontFamily = font;
      this.repaint();
    },
    
    
    /**
     * @method
     * A Label did have "autosize". Do nothing at all.
     *
     **/
    setDimension:function( w, h)
    {
        // reset of the cache must stay here and in repaint!
        this.cachedWidth=null;
        this.cachedHeight=null;
        
        this._super(w,h);
    },
    
    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. width of this object.
     */
    getMinWidth:function()
    {
        if (this.shape === null) {
            return 0;
        }
        
        if(this.cachedMinWidth=== null){
            this.cachedMinWidth=this.svgNodes.getBBox(true).width+2*this.padding+2*this.getStroke();
        }
        
        return this.cachedMinWidth;
    },
    
    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. width of this object.
     */
    getMinHeight:function()
    {
        if (this.shape === null) {
            return 0;
        }
        
        if(this.cachedMinHeight=== null){
            this.cachedMinHeight=this.svgNodes.getBBox(true).height+2*this.padding+2*this.getStroke();
        }
        
        return this.cachedMinHeight;
    },
    
    /**
     * @method
     * Return the calculate width of the set. This calculates the bounding box of all elements.
     * 
     * @returns the calculated width of the label
     * @return {Number}
     **/
    getWidth : function() {
        
        if (this.shape === null) {
            return 0;
        }
        
        if(this.cachedWidth===null){
            this.cachedWidth = Math.max(this.width, this.getMinWidth());
        }
        
        
        return this.cachedWidth;
    },
    
    /**
     * @method
     * Return the calculated height of the set. This calculates the bounding box of all elements.
     * 
     * @returns the calculated height of the label
     * @return {Number}
     */
    getHeight:function()
    {
        if (this.shape === null) {
            return 0;
        }
        
        if(this.cachedHeight===null){
            this.cachedHeight = Math.max(this.height, this.getMinHeight());
        }
        
        
        return this.cachedHeight;
    },

    /**
     * @method
     * Set an editor for the label. This can be a dialog or inplace editor for the 
     * Text.<br>
     * The editor will be activated if you doubleClick on the label.
     * 
     * @param {draw2d.ui.LabelEditor} editor
     */
    installEditor: function( editor ){
      this.editor = editor;  
    },
    
    /**
     * @method
     * Called when a user dbl clicks on the element
     * 
     * @template
     */
    onDoubleClick: function(){
        if(this.editor!==null){
            this.editor.start(this);
        }
    },
    
    
    /**
     * @method
     * Returns the current text of the label.
     *
     * @returns the current display text of the label
     * @type String
     **/
    getText:function()
    {
      return this.text;
    },
    
    /**
     * @method
     * Set the text for the label. Use \n for multiline text.
     * 
     * @param {String} text The new text for the label.
     **/
    setText:function( text )
    {
      this.cachedWidth=null;
      this.cachedHeight=null;
      this.cachedMinWidth  = null;
      this.cachedMinHeight = null;
      this.text = text;
      
      this.repaint();
      // Update the resize handles if the user change the position of the element via an API call.
      //
      this.editPolicy.each($.proxy(function(i,e){
         if(e instanceof draw2d.policy.figure.DragDropEditPolicy){
             e.moved(this.canvas, this);
         }
      },this));

      this.fireResizeEvent();
      
      if(this.parent!==null)
          this.parent.repaint();
    },
    

    hitTest: function(x, y) {
        // apply a simple bounding box test if the label isn'T rotated
        //
        if( this.rotationAngle === 0){
            return this._super(x,y); 
        }
        
        // rotate the box with the current matrix of the
        // shape
        var matrix = this.shape.matrix;
        var points = this.getBoundingBox().getPoints();
        points.each(function(i,point){
            var x = matrix.x(point.x,point.y);
            var y = matrix.y(point.x,point.y);
            point.x=x;
            point.y=y;
        });

        var polySides=4;
        var i=0;
        var j=polySides-1 ;
        var oddNodes=false;

        for (i=0; i<polySides; i++) {
            var pi = points.get(i);
            var pj = points.get(j);
            if ((pi.y< y && pj.y>=y
            ||   pj.y< y && pi.y>=y)
            &&  (pi.x<=x || pj.x<=x)) {
              if (pi.x+(y-pi.y)/(pj.y-pi.y)*(pj.x-pi.x)<x) {
                oddNodes=!oddNodes; }}
            j=i; }
        return oddNodes; 
     },
     

     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes : function()
     {
         var memento = this._super();
         
         memento.text = this.text;
         memento.fontSize = this.fontSize;
         memento.fontColor = this.fontColor.hash();
         memento.fontFamily = this.fontFamily;

         return memento;
     },
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      * 
      * @param {Object} memento
      * @returns 
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         if(typeof memento.text !=="undefined"){
             this.setText(memento.text);
         }
         if(typeof memento.fontFamily !=="undefined"){
             this.setFontFamily(memento.fontFamily);
         }
         if(typeof memento.fontSize !=="undefined"){
             this.setFontSize(memento.fontSize);
         }
         if(typeof memento.fontColor !=="undefined"){
             this.setFontColor(memento.fontColor);
         }
     }

});



