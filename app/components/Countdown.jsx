var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');


var Countdown = React.createClass({
  getInitialState : function(){
    return {
      count :0,
      countdownStatus:'stopped'
    };
  },
  componentDidUpdate: function(prevProps,prevState){
    if(this.state.countdownStatus !== prevState.countdownStatus){
      switch(this.state.countdownStatus){
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count:0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },
  // componentWillUpdate:function(nextProp,nextState){
  //   console.log('this.state and prop is not change yet but you have access to upcoming new prop and state');
  // },
  // componentWillMount:function(){
  //   console.log('component will mount. do have access to refs yet');
  // },
  // componentDidMount:function(){
  //   console.log('compoent did mount. you have access to refs now');
  // },
  componentWillUnmount:function(){
    clearInterval(this.timer);
    this.timer = undefined;
  },
  startTimer : function(){
    this.timer = setInterval(()=>{
      var newCount = this.state.count - 1;
      this.setState({
        count:newCount >= 0 ? newCount : 0
      });

      if(newCount === 0){
        this.setState(
          {countdownStatus:'stopped'}
        )
      }
    },1000);
  },
  handleSetCountdown:function(seconds){
    this.setState({
      count:seconds,
      countdownStatus:'started'
    })
  },
  handleStatusChange : function(newStatus){
    this.setState({
      countdownStatus:newStatus
    })
  },
  render:function(){
    var {count,countdownStatus} = this.state;
    var renderControlArea = () =>{
      if(countdownStatus !== "stopped"){
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
      }else{
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      }
    };


    return (
      <div>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    )
  }
});

module.exports = Countdown;
