import _ from 'lodash';
import moment from 'moment';
import { blockCardTypeProps, blockPincodeDeleteProps, blockResetReasonProps, blockResetTypeProps, blockSetupResultProps, doorlockBlockAuthProps, doorlockBlockResultProps, doorlockFormatterFwTypeProps, logFormatterProps } from '../../types/formatter';
import doorlockFormatter from './DoorlockFormatter';

const blockResult = (v:doorlockBlockResultProps) => ({
  0: 'Result(None)',
  1: 'Result(Success)',
  2: 'Result(Error_Reservation)',
  3: 'Result(Error_Time)',
  4: 'Result(Error_MobileKey)',
  5: 'Result(Error_No MobieKey found)',
  6: 'Result(Error_Sequence Error)',
  7: 'Result(Error_Thumb Turn Locked)',
  8: 'Result(Error_Hotel)',
  9: 'Result(Error_Emergency)',
  10: 'Result(Error_Blocking)',
  11: 'Result(Error_Construction)',
  17: 'Result(Error_Disallowed)',
}[v] || `Result(Unknown - ${v})`);

const blockAuth = (v:doorlockBlockAuthProps) => ({
  C1: 'Auth(1 MobileKey)',
  C2: 'Auth(2 MobileKey)',
  C3: 'Auth(3 Master MobileKey)',
  C4: 'Auth(4 Staff MobileKey)',
  C5: 'Auth(5 Master MobileKey)',
  C6: 'Auth(6 Staff MobileKey)',
}[v] || `Auth(Unknown - ${v})`);

const blockCardType = (v:blockCardTypeProps) => ({
  0: 'CardType(Key Fob)',
  10: 'CardType(Guest card)',
  20: 'CardType(Staff Building card)',
  21: 'CardType(Staff Floor card)',
  22: 'CardType(Staff Group A card)',
  23: 'CardType(Staff Group B card)',
  24: 'CardType(Staff Maintenance card)',
  30: 'CardType(Master Supervisor card)',
  31: 'CardType(Master Emergence card)',
  32: 'CardType(Master Blocking card)',
  33: 'CardType(Master Open card)',
  34: 'CardType(Master Prohibit card)',
  40: 'CardType(Setup Room card)',
  41: 'CardType(Setup Access card)',
  42: 'CardType(Setup Common card)',
  43: 'CardType(Setup Group card)',
  44: 'CardType(Setup Ble card)',
  45: 'CardType(Setup DateTime card)',
  46: 'CardType(Setup DoorParam card)',
  47: 'CardType(Setup Touch card)',
  48: 'CardType(Setup Elevator card)',
  49: 'CardType(Setup Elevator card)',
  '4A': 'CardType(Setup Elevator card)',
  '4B': 'CardType(Setup card)',
  '4C': 'CardType(Setup card)',
  '4D': 'CardType(Setup card)',
  FF: 'CardType(Setup card)',
  E7: 'CardType(Factory Reset card)',
  E9: 'CardType(Reset card)',
  E1: 'CardType(Clean Done card)',
  80: 'CardType(MobileApp Setup)',
}[v] || `CardType(Unknown - ${v})`);

const blockFWModel = (v:doorlockFormatterFwTypeProps) => `${doorlockFormatter.fwType(v)}`;
const blockSimple = (name:string, value:string) => `${name}(${value})`;
const blockSetTime = (v:Date) => moment(v).format('YYYY-MM-DD HH:mm:ss');
const blockSetTimeZone = (v:string) => blockSimple('TimeZone', v);
const blockSize = (v:string) => blockSimple('Size', v);
const blockUser = (v:string) => blockSimple('User', v);
const blockID = (v:string) => blockSimple('ID', v);
const blockFWVersion = (v:string) => blockSimple('Version', v);
const blockCMD = (v:string) => blockSimple('CMD', v);
const blockErrorCode = (v:string) => blockSimple('Code', v);
const blockCodebookID = (v:string) => blockSimple('Id', v);
const blockState = (s:string) => {
  const [bit3, , bit1] = s.split('');
  const bit3String = bit3 === '0' ? 'Closed' : 'Opened';
  const bit1String = bit1 === '0' ? 'UnLocked' : 'Locked';
  return `State(${s}_${bit3String}_${bit1String})`;
};
const modeString = (s:string) => `Mode(${s})`;
const blockMode = (m:string) => {
  const [uninstalled, opening, blocking, emergency] = m.split('');
  if (opening === '1') return modeString('Construction Mode');
  if (blocking === '1') return modeString('Blocking Mode');
  if (emergency === '1') return modeString('Emergency Mode');
  if (uninstalled === '1') return modeString('Invalid Mode');
  return modeString('Normal Mode');
};
const blockUserCode = (v:string) => blockSimple('Code', v);
const blockPincodeVersion = (v:string) => blockSimple('Version', v);
const blockPincodeLength = (v:string) => v === '0' ? 'Disallowed' : blockSimple('Length', v);
const blockCodeBook = (v:string) => blockSimple('CodeBook', v);
const blockSequence = (v:string) => blockSimple('Sequence', v);
const blockPincode = (v:string) => blockSimple('PinCode', v);
const blockPincodeStart = (v:string) => {
  const hexToDec = parseInt(v, 16);
  return blockSimple('Start', moment.unix(hexToDec).format('YYYY-MM-DD HH:mm'));
};
const blockPincodeEnd = (v:string) => {
  const hexToDec = parseInt(v, 16);
  return hexToDec ? blockSimple('End', moment.unix(hexToDec).format('YYYY-MM-DD HH:mm')) : '';
};
const blockPincodeDelete = (v:blockPincodeDeleteProps) => {
  const deleteType = {
    '241': 'Card',
    '242': 'MobileKey',
    '244': 'PinCode',
    '248': 'Etc',
  };
  return blockSimple('Delete', deleteType[v] || 'Unknown');
};

const blockSetupResult = (v:blockSetupResultProps) => {
  const formated = {
    0: 'Erase',
    1: 'Write',
  }[v] || `Unknown - ${v}`;
  return `Result(${formated})`;
};
const blockRTCReset = (v:string) => (v === '1' ? 'RTC RESET' : '');
const blockResetReason = (v:any) => {
  const v2:blockResetReasonProps = v.slice(1, 2);
  const formated =  {
    0: 'Normal',
    1: 'Dfu',
    2: 'Master',
    3: 'Tenant',
  }[v2] || 'UnKnown'
  return formated;
};
const blockResetType = (v:blockResetTypeProps) => (v === '00' ? '' : {
  '01': 'POWER',
  '02': 'WATCHDOG',
  '04': 'SOFT',
  '08': 'CPU',
  '10': 'GPIO',
  '20': 'LPCOMP',
  '40': 'DEBUG',
  '80': 'NRF',
}[v] || 'UnKnown');
const blockResetCount = (v:string) => v ? v.slice(0, 1) !== '0' ? v : v.slice(1) : 'UnKnown';
const blockDoorlockSerial = (v:string) => v && v.length === 8 ? v : 'UnKnown';
const blockCodebookCount = (v:string) => v && v.length === 2 ? v.slice(1, 2) : 'UnKnown';

const logFormatter = {
  64: ['Booting', []],
  65: ['Set Time', [blockUser, blockSetTime, blockRTCReset]],
  66: ['Set TimeZone', [blockUser, blockSetTimeZone, blockRTCReset]],
  67: ['Mobilekey Add', [blockUser, blockID, blockRTCReset]],
  68: ['Mobilekey Delete', [blockUser, blockID, blockRTCReset]],
  69: ['Mobilekey Delete All', [blockUser, blockSize, blockRTCReset]],
  70: ['Mobilekey Authorization', [blockUser, blockID, blockAuth, blockResult, blockState, blockMode, blockRTCReset]],
  71: ['Card Authorization', [blockUser, blockCardType, blockResult, blockState, blockMode, blockRTCReset]],
  72: ['Key Authorization', [blockState, blockMode, blockRTCReset]],
  73: ['PinCode Authorization', [blockRTCReset]],
  74: ['UserCode Authorization', [blockUserCode, blockRTCReset]],
  75: ['Change State', [blockState, blockMode, blockRTCReset]],
  76: ['Metal Touch Detected', [blockState, blockMode, blockRTCReset]],
  77: ['Setup Card', [blockUser, blockCardType, blockSetupResult, blockState, blockMode, blockRTCReset]],
  78: ['PinCode Authorization', []],
  79: ['Operation Fail', [blockCMD, blockErrorCode, blockCodebookID, blockRTCReset]],
};

const logFormatterTypeList = [
  { text: 'Booting(64)', value: 64 },
  { text: 'Set Time(65)', value: 65 },
  { text: 'Set TimeZone(66)', value: 66 },
  { text: 'Mobilekey Add(67)', value: 67 },
  { text: 'Mobilekey Delete(68)', value: 68 },
  { text: 'Mobilekey Delete All(69)', value: 69 },
  { text: 'Mobilekey Authorization(70)', value: 70 },
  { text: 'Card Authorization(71)', value: 71 },
  { text: 'Key Authorization(72)', value: 72 },
  { text: 'PinCode Authorization(73)', value: 73 },
  { text: 'UserCode Authorization(74)', value: 74 },
  { text: 'Change State(75)', value: 75 },
  { text: 'Metal Touch Detected(76)', value: 76 },
  { text: 'Setup Card(77)', value: 77 },
  { text: 'PinCode Authorization(78)', value: 78 },
  { text: 'Operation Fail(79)', value: 79 },
];

const messageDesc = (type:any, message:string, formatter:any) => {
  const blocks = _.slice(_.map(message.split(','), v => v.trim()), 0, formatter.length);
  const blocks2 = _.map(blocks, (b, i) => formatter[i](b));
  return _.compact(blocks2).join(', ');
};

const bootingMessageDesc = (type:string, message:any) => {
  const splitedMessage = message.split(/[\s,]+/);
  if (splitedMessage.length <= 4) {
    const formattedMessage = [
      blockFWVersion(splitedMessage[0]),
      blockFWModel(splitedMessage[1]),
      splitedMessage[3] ? `${splitedMessage[3]}${splitedMessage[2] === '1' ? '(RTC RESET)' : ''}` : blockRTCReset(splitedMessage[2]),
    ];
    return _.compact(formattedMessage).join(', ');
  }
  else {
    const formattedMessage = [
      blockFWVersion(splitedMessage[0]),
      blockFWModel(splitedMessage[1]),
      `${splitedMessage[3]}${splitedMessage[2] === '1' ? '(RTC RESET)' : ''}`,
      blockDoorlockSerial(splitedMessage[4]),
      blockCodebookCount(splitedMessage[5]),
      splitedMessage[6] && blockResetReason(splitedMessage[6].slice(0, 2)),
      splitedMessage[6] && blockResetType(splitedMessage[6].slice(2, 4)),
      splitedMessage[6] && blockResetCount(splitedMessage[6].slice(4)),
    ];
    return _.compact(formattedMessage).join(', ');
  }
};

const pincodeAuthorizationMessageDesc = (type:string, message:string) => {
  const splited = message.split(',');
  const separator:number = splited.length;
  const formatterList = {
    9: [blockPincodeVersion, parseInt(splited[1]) > 240 ? blockPincodeDelete : blockPincodeLength, blockCodeBook, blockSequence, blockPincode, blockPincodeStart, blockPincodeEnd, blockRTCReset],
    6: [blockPincodeVersion, blockPincodeLength, blockCodeBook, blockPincode, blockRTCReset],
  };
  const formatter = formatterList[separator === 6? 6 : 9];
  return !formatter ? message : messageDesc(type, message, formatter);
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  formatType(type:logFormatterProps) {
    const table = logFormatter[type];
    return table ? `${table[0]}(${type})` : `*${type}`;
  },
  formatMessage(type:logFormatterProps, message:string) {
    try {
      const table = logFormatter[type];
      if (table) {
        const [, formatter] = table;
        if (type === '64') return bootingMessageDesc(type, message);
        if (type === '78') return pincodeAuthorizationMessageDesc(type, message);
        return messageDesc(type, message, formatter);
      }
      return message;
    } catch (error) {
      return message;
    }
  },
  formatTime(time:Date) {
    if (moment(time).isValid()) return moment(time).format('YYYY-MM-DD HH:mm:ss');
    return `Unknown - ${time}`;
  },
  logFormatterTypeList,
//   getFormatTypeList() {
//     return logFormatterTypeList;
//   },
};
