import {combineReducers} from 'redux';
import scanyReducer from './scany.reducer';
import scanxReducer from './scanx.reducer';
import scanzReducer from './scanz.reducer';
import scanUploadedReducer from './scanupload.reducer';
import reportReducer from '../Reports/report.reducer';
import returnRightReducer from '../EditGrant/edit.reducer'

export default combineReducers({
  scanxReducer,
  scanyReducer,
  scanzReducer,
  scanUploadedReducer,
  reportReducer,
  returnRightReducer
});
