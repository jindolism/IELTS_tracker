import GlobalVal from '../../assets/global';

//this is helper function for timeConvert from second based value to "min : sec" form.
function _timeConverter (time) {
    return this._digitUpdate(Math.floor(time/GlobalVal.BASE_TIME)) + ":" + this._digitUpdate(Math.ceil (time % GlobalVal.BASE_TIME));
  }

//This is helper function to shows 0 value when it is 1 digit number
function _digitUpdate(num) {
    if(num > 9) return num;
    return '0'+ num;
  }

 export {
    _timeConverter,
    _digitUpdate,
 };