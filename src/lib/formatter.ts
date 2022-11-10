import moment from 'moment';
import { doorlockStatusProps, keytagStatusProps, languageTypeStateProps, pincodeTypeStateProps, reportDataExcelStateProps, reportJsonDiffsFormatterProps, reportKeyTypeStateProps, roomsProps, staffRoleStatusProps, staffStatusProps } from '../types/formatter';

export const dateFormatter = (date:Date|string) => {
  return moment(date).format('YYYY-MM-DD HH:mm');
};

export const reportDateFormatter = (date:Date|string) => {
  return moment(date).format('YYYY-MM-DD');
};

export const reportHourFormatter = (date:Date|string) => {
  return moment(date).format('HH:mm');
};

export const doorlockStatusFormatter = (status: doorlockStatusProps) => {
  const formatter = {
    created: '미설치',
    installed: '설치됨',
  };
  return formatter[status];
};

export const doorlockBatteryFormatter = (battery:number) => {
  return `${battery}%`;
};

export const staffRoleFormatter = (role:staffRoleStatusProps) => {
  const formatter = {
      master: '마스터',
      manager: '관리 스태프',
      housekeeping: '하우스키핑',
      manager_mobilekey: '스태프 모바일키',
      doorlock_setting: '도어락 세팅',
  };
  return role? formatter[role] : "";
};

export const staffStatusFormatter = (status:staffStatusProps) => {
  const formatter: { [key in staffStatusProps]: string } = {
    granting: '가입 승인중',
    granted: '가입 완료됨',
  }
  return formatter[status];
};

export const roomsFormatter = (rooms:roomsProps[]) => {
  return JSON.stringify(rooms.map(room => room.name)).replace(/["[\]]/gi, '');
};

export const reportDataExcelColumns = (reportType:reportDataExcelStateProps) => {
  const formatter= {
    userkey: [
      { name: '키타입', key: 'key_type' },
      { name: '내용', key: 'operation' },
      { name: '빌딩', key: 'building_name' },
      { name: '객실', key: 'json_destination.room' },
      { name: '예약자명', key: 'grantee_name' },
      { name: '전화번호', key: 'grantee_phone_number' },
      { name: '입실일', key: 'start_at_day' },
      { name: '입실시간', key: 'start_at_hour' },
      { name: '퇴실일', key: 'end_at_day' },
      { name: '퇴실시간', key: 'end_at_hour' },
      { name: '발급자', key: 'actor_name' },
      { name: '시컨스', key: 'json_context.seq_num' },
      { name: '생성일자', key: 'created_at' },
    ],
    facility: [
      { name: '시설', key: 'facility_name' },
      { name: '빌딩', key: 'building_name' },
      { name: '내용', key: 'operation' },
      { name: '상세내용', key: 'json_diffs' },
      { name: '스태프', key: 'actor_name' },
      { name: '생성일자', key: 'created_at' },
    ],
    staff: [
      { name: '행위자 이름', key: 'actor_name' },
      { name: '행위자 전화번호', key: 'actor_phone_number' },
      { name: '행위자 권한', key: 'actor_role' },
      { name: '내용', key: 'operation' },
      { name: '키타입', key: 'key_type' },
      { name: '상세내용', key: 'json_diffs' },
      { name: '객실', key: 'json_destination.rooms' },
      { name: '대상자 이름', key: 'grantee_name' },
      { name: '대상자 전화번호', key: 'grantee_phone_number' },
      { name: '대상자 권한', key: 'grantee_role' },
      { name: '생성일자', key: 'created_at' },
    ],
    user_mobilekey: [
      { name: '빌딩', key: 'building_name' },
      { name: '객실', key: 'json_destination.room' },
      { name: '내용', key: 'operation' },
      { name: '사용자명', key: 'actor_name' },
      { name: '전화번호', key: 'actor_phone_number' },
      { name: '생성일자', key: 'created_at' },
    ],
  }
  return formatter[reportType];
};

export const reportListFormatter = (reportItem:any, key:string, userRole:string) => {
  switch (key) {
    case 'operation':
      return reportItem.operation ? reportItem.operation.replace('Hotel', 'Property') : '-';
    case 'key_type':
      return reportKeyTypeFormatter(reportItem.key_type);
    case 'actor_role':
      return staffRoleFormatter(reportItem.actor_role);
    case 'grantee_role':
      return staffRoleFormatter(reportItem.grantee_role);
    case 'start_at_day':
      return reportItem.json_context ?
        reportDateFormatter(reportItem.json_context.start_at) : '-';
    case 'start_at_hour':
      return reportItem.json_context ?
        reportHourFormatter(reportItem.json_context.start_at) : '-';
    case 'end_at_day':
      return reportItem.json_context ?
        reportDateFormatter(reportItem.json_context.end_at) : '-';
    case 'end_at_hour':
      return reportItem.json_context ?
        reportHourFormatter(reportItem.json_context.end_at) : '-';
    case 'json_destination.room':
      return reportItem.json_destination ? reportItem.json_destination.room : '-';
    case 'json_destination.rooms':
      return reportItem.json_destination ? reportItem.json_destination.rooms : '-';
    case 'json_context.seq_num':
      return reportItem.json_context ? reportItem.json_context.seq_num : '-';
    case 'json_diffs':
      return reportItem.json_diffs ? reportJsonDiffsFormatter(reportItem.json_diffs) : '-';
    case 'created_at':
      return dateFormatter(reportItem.created_at);
    case 'actor_name':
      return reportItem[key]? userRole === 'master'? reportItem[key] : nameChange(reportItem[key]) : '-';
    case 'grantee_name':
      return reportItem[key]? userRole === 'master'? reportItem[key] : nameChange(reportItem[key]) : '-';
    case 'grantee_phone_number':
      return reportItem[key]? userRole === 'master'? reportItem[key] : phoneChange(reportItem[key]) : '-';
    case 'actor_phone_number':
      return reportItem[key]? userRole === 'master'? reportItem[key] : phoneChange(reportItem[key]) : '-';
    default:
      return reportItem[key] || '-';
  }
};

export const reportKeyTypeFormatter = (keyType:reportKeyTypeStateProps) => {
  const formatter = {
    mobilekey: '모바일키',
    pincode: '핀코드',
    cardkey: '카드키',
    cardkey_master: '마스터 카드',
    cardkey_ble: 'BLE 카드',
    cardkey_init: '초기화 카드',
  };
  return formatter[keyType];
};

export const staffKeyTypeFormatter = (type:reportKeyTypeStateProps) => {
  const formatter = {
    mobilekey: '모바일키',
    pincode: '핀코드',
    cardkey: '카드키',
    cardkey_master: '마스터 카드',
    cardkey_ble: '설정 카드',
    cardkey_init: '초기화 카드',
  };
  return formatter[type];
};

const reportJsonDiffsFormatter = (diffs:reportJsonDiffsFormatterProps[]) => {
  return diffs.map((diff) => diff.key + ': ' + diff.oldValue + ' -> ' + diff.newValue);
};

export const pincodeTypeFormatter = (pincodeType:pincodeTypeStateProps) => {
  const formatter = {
    day: '일단위',
    hour: '시간단위',
    '10mins': '10분단위',
  };
  return formatter[pincodeType];
};

export const excelBookingListFormatter = (booking:any, key:string) => {
  switch (key) {
    case 'user.name':
      return booking.user ? booking.user.name : '-';
    case 'user.phone_number':
      return booking.user ? booking.user.phone_number : '-';
    case 'checkin_at':
      return dateFormatter(booking.checkin_at);
    case 'checkout_at':
      return dateFormatter(booking.checkout_at);
    case 'building.name':
      return booking.building ? booking.building.name : '-';
    case 'room.name':
      return booking.room ? booking.room.name : '-';
    case 'cards':
      return booking.cards.length;
    case 'mobilekeys':
      return booking.mobilekeys.length;
    case 'pincodes':
      return booking.pincodes.length;
    case 'created_at':
      return dateFormatter(booking.created_at);
    default:
      return booking[key] || '-';
  }
};

export const keytagStatusFormatter = (status: keytagStatusProps) => {
  const formatter = {
    created: '미설치',
    installed: '설치됨',
    updated: '수정됨'
  };
  return formatter[status];
};
export const languageTypeItem = [
  {value: 1, key: '한국어'},
  {value: 2, key: '영어'},
  {value: 4, key: '중국어'},
  {value: 8, key: '일본어'},
  {value: 16, key: '스페인어'},
  {value: 32, key: '프랑스어'},
  {value: 64, key: '독일어'},
  //2개
  {value: 3, key: '한국어+영어'},
  {value: 5, key: '한국어+중국어'},
  {value: 9, key: '한국어+일본어'},
  {value: 17, key: '한국어+스페인어'},
  {value: 33, key: '한국어+프랑스어'},
  {value: 65, key: '한국어+독일어'},
  {value: 6, key: '영어+중국어'},
  {value: 10, key: '영어+일본어'},  
  {value: 18, key: '영어+스페인어'},
  {value: 34, key: '영어+프랑스어'},
  {value: 66, key: '영어+독일어'},
  {value: 12, key: '중국어+일본어'},
  {value: 20, key: '중국어+스페인어'},  
  {value: 36, key: '중국어+프랑스어'},
  {value: 68, key: '중국어+독일어'},
  {value: 24, key: '일본어+스페인어'},
  {value: 40, key: '일본어+프랑스어'},
  {value: 72, key: '일본어+독일어'},
  {value: 48, key: '스페인어+프랑스어'},
  {value: 80, key: '스페인어+독일어'},
  {value: 96, key: '프랑스어+독일어'},
  //3개
  {value: 7, key: '한국어+영어+중국어'},
  {value: 11, key: '한국어+영어+일본어'},
  {value: 19, key: '한국어+영어+스페인어'},
  {value: 35, key: '한국어+영어+프랑스어'},
  {value: 67, key: '한국어+영어+독일어'},
  {value: 13, key: '한국어+중국어+일본어'},
  {value: 21, key: '한국어+중국어+스페인어'},
  {value: 37, key: '한국어+중국어+프랑스어'},
  {value: 69, key: '한국어+중국어+독일어'},
  {value: 25, key: '한국어+일본어+스페인어'},
  {value: 41, key: '한국어+일본어+프랑스어'},
  {value: 73, key: '한국어+일본어+독일어'},
  {value: 49, key: '한국어+스페인어+프랑스어'},
  {value: 81, key: '한국어+스페인어+독일어'},
  {value: 97, key: '한국어+프랑스어+독일어'},
  {value: 14, key: '영어+중국어+일본어'},
  {value: 22, key: '영어+중국어+스페인어'},
  {value: 38, key: '영어+중국어+프랑스어'},
  {value: 70, key: '영어+중국어+독일어'},
  {value: 26, key: '영어+일본어+스페인어'},
  {value: 42, key: '영어+일본어+프랑스어'},
  {value: 74, key: '영어+일본어+독일어'},
  {value: 50, key: '영어+스페인어+프랑스어'},
  {value: 82, key: '영어+스페인어+독일어'},
  {value: 98, key: '영어+프랑스어+독일어'},
  {value: 28, key: '중국어+일본어+스페인어'},
  {value: 44, key: '중국어+일본어+프랑스어'},
  {value: 76, key: '중국어+일본어+독일어'},
  {value: 52, key: '중국어+스페인어+프랑스어'},
  {value: 84, key: '중국어+스페인어+독일어'},
  {value: 100, key: '중국어+프랑스어+독일어'},
  {value: 56, key: '일본어+스페인어+프랑스어'},
  {value: 88, key: '일본어+스페인어+독일어'},
  {value: 104, key: '일본어+프랑스어+독일어'},
  {value: 112, key: '스페인어+프랑스어+독일어'},
  //4개
  {value: 15, key: '한국어+영어+중국어+일본어'},
  {value: 23, key: '한국어+영어+중국어+스페인어'},
  {value: 39, key: '한국어+영어+중국어+프랑스어'},
  {value: 71, key: '한국어+영어+중국어+독일어'},
  {value: 27, key: '한국어+영어+일본어+스페인어'},
  {value: 43, key: '한국어+영어+일본어+프랑스어'},
  {value: 75, key: '한국어+영어+일본어+독일어'},
  {value: 51, key: '한국어+영어+스페인어+프랑스어'},
  {value: 83, key: '한국어+영어+스페인어+독일어'},
  {value: 99, key: '한국어+영어+프랑스어+독일어'},
  {value: 29, key: '한국어+중국어+일본어+스페인어'},
  {value: 45, key: '한국어+중국어+일본어+프랑스어'},
  {value: 77, key: '한국어+중국어+일본어+독일어'},
  {value: 53, key: '한국어+중국어+스페인어+프랑스어'},
  {value: 85, key: '한국어+중국어+스페인어+독일어'},
  {value: 101, key: '한국어+중국어+프랑스어+독일어'},
  {value: 57, key: '한국어+일본어+스페인어+프랑스어'},
  {value: 89, key: '한국어+일본어+스페인어+독일어'},
  {value: 105, key: '한국어+일본어+프랑스어+독일어'},
  {value: 113, key: '한국어+스페인어+프랑스어+독일어'},
  {value: 30, key: '영어+중국어+일본어+스페인어'},
  {value: 46, key: '영어+중국어+일본어+프랑스어'},
  {value: 78, key: '영어+중국어+일본어+독일어'},
  {value: 54, key: '영어+중국어+스페인어+프랑스어'},
  {value: 86, key: '영어+중국어+스페인어+독일어'},
  {value: 102, key: '영어+중국어+프랑스어+독일어'},
  {value: 58, key: '영어+일본어+스페인어+프랑스어'},
  {value: 90, key: '영어+일본어+스페인어+독일어'},
  {value: 106, key: '영어+일본어+프랑스어+독일어'},
  {value: 114, key: '영어+스페인어+프랑스어+독일어'},
  {value: 60, key: '중국어+일본어+스페인어+프랑스어'},
  {value: 92, key: '중국어+일본어+스페인어+독일어'},
  {value: 108, key: '중국어+일본어+프랑스어+독일어'},
  {value: 116, key: '중국어+스페인어+프랑스어+독일어'},
  {value: 120, key: '일본어+스페인어+프랑스어+독일어'},
  //5개
  {value: 31, key: '한국어+영어+중국어+일본어+스페인어'},
  {value: 47, key: '한국어+영어+중국어+일본어+프랑스어'},
  {value: 79, key: '한국어+영어+중국어+일본어+독일어'},
  {value: 55, key: '한국어+영어+중국어+스페인어+프랑스어'},
  {value: 87, key: '한국어+영어+중국어+스페인어+독일어'},
  {value: 103, key: '한국어+영어+중국어+프랑스어+독일어'},
  {value: 59, key: '한국어+영어+일본어+스페인어+프랑스어'},
  {value: 91, key: '한국어+영어+일본어+스페인어+독일어'},
  {value: 107, key: '한국어+영어+일본어+프랑스어+독일어'},
  {value: 115, key: '한국어+영어+스페인어+프랑스어+독일어'},
  {value: 61, key: '한국어+중국어+일본어+스페인어+프랑스어'},
  {value: 93, key: '한국어+중국어+일본어+스페인어+독일어'},
  {value: 109, key: '한국어+중국어+일본어+프랑스어+독일어'},
  {value: 117, key: '한국어+중국어+스페인어+프랑스어+독일어'},
  {value: 121, key: '한국어+일본어+스페인어+프랑스어+독일어'},
  {value: 62, key: '영어+중국어+일본어+스페인어+프랑스어'},
  {value: 94, key: '영어+중국어+일본어+스페인어+독일어'},
  {value: 110, key: '영어+중국어+일본어+프랑스어+독일어'},
  {value: 118, key: '영어+중국어+스페인어+프랑스어+독일어'},
  {value: 122, key: '영어+일본어+스페인어+프랑스어+독일어'},
  {value: 124, key: '중국어+일본어+스페인어+프랑스어+독일어'},
  //6개
  {value: 63, key: '한국어+영어+중국어+일본어+스페인어+프랑스어'},
  {value: 95, key: '한국어+영어+중국어+일본어+스페인어+독일어'},
  {value: 111, key: '한국어+영어+중국어+일본어+프랑스어+독일어'},
  {value: 119, key: '한국어+영어+중국어+스페인어+프랑스어+독일어'},
  {value: 123, key: '한국어+영어+일본어+스페인어+프랑스어+독일어'},
  {value: 125, key: '한국어+중국어+일본어+스페인어+프랑스어+독일어'},
  {value: 127, key: '한국어+영어+중국어+일본어+스페인어+프랑스어+독일어'},
  {value: 126, key: '영어+중국어+일본어+스페인어+프랑스어+독일어'},
  {value: 128, key: 'etc'},
];

export const languageTypeFormatter = (type:languageTypeStateProps) => {
  const formatter = {
    1: '한국어',
    2: '영어',
    3: '한국어+영어',
    4: '중국어',
    5: '한국어+중국어',
    6: '영어+중국어',
    7: '한국어+영어+중국어',
    8: '일본어',
    9: '한국어+일본어',
    10: '영어+일본어',
    11: '한국어+영어+일본어',
    12: '중국어+일본어',
    13: '한국어+중국어+일본어',
    14: '영어+중국어+일본어',
    15: '한국어+영어+중국어+일본어',
    16: '스페인어',
    17: '한국어+스페인어',
    18: '영어+스페인어',
    19: '한국어+영어+스페인어',
    20: '중국어+스페인어',
    21: '한국어+중국어+스페인어',
    22: '영어+중국어+스페인어',
    23: '한국어+영어+중국어+스페인어',
    24: '일본어+스페인어',
    25: '한국어+일본어+스페인어',
    26: '영어+일본어+스페인어',
    27: '한국어+영어+일본어+스페인어',
    28: '중국어+일본어+스페인어',
    29: '한국어+중국어+일본어+스페인어',
    30: '영어+중국어+일본어+스페인어',
    31: '한국어+영어+중국어+일본어+스페인어',
    32: '프랑스어',
    33: '한국어+프랑스어',
    34: '영어+프랑스어',
    35: '한국어+영어+프랑스어',
    36: '중국어+프랑스어',
    37: '한국어+중국어+프랑스어',
    38: '영어+중국어+프랑스어',
    39: '한국어+영어+중국어+프랑스어',
    40: '일본어+프랑스어',
    41: '한국어+일본어+프랑스어',
    42: '영어+일본어+프랑스어',
    43: '한국어+영어+일본어+프랑스어',
    44: '중국어+일본어+프랑스어',
    45: '한국어+중국어+일본어+프랑스어',
    46: '영어+중국어+일본어+프랑스어',
    47: '한국어+영어+중국어+일본어+프랑스어',
    48: '스페인어+프랑스어',
    49: '한국어+스페인어+프랑스어',
    50: '영어+스페인어+프랑스어',
    51: '한국어+영어+스페인어+프랑스어',
    52: '중국어+스페인어+프랑스어',
    53: '한국어+중국어+스페인어+프랑스어',
    54: '영어+중국어+스페인어+프랑스어',
    55: '한국어+영어+중국어+스페인어+프랑스어',
    56: '일본어+스페인어+프랑스어',
    57: '한국어+일본어+스페인어+프랑스어',
    58: '영어+일본어+스페인어+프랑스어',
    59: '한국어+영어+일본어+스페인어+프랑스어',
    60: '중국어+일본어+스페인어+프랑스어',
    61: '한국어+중국어+일본어+스페인어+프랑스어',
    62: '영어+중국어+일본어+스페인어+프랑스어',
    63: '한국어+영어+중국어+일본어+스페인어+프랑스어',
    64: '독일어',
    65: '한국어+독일어',
    66: '영어+독일어',
    67: '한국어+영어+독일어',
    68: '중국어+독일어',
    69: '한국어+중국어+독일어',
    70: '영어+중국어+독일어',
    71: '한국어+영어+중국어+독일어',
    72: '일본어+독일어',
    73: '한국어+일본어+독일어',
    74: '영어+일본어+독일어',
    75: '한국어+영어+일본어+독일어',
    76: '중국어+일본어+독일어',
    77: '한국어+중국어+일본어+독일어',
    78: '영어+중국어+일본어+독일어',
    79: '한국어+영어+중국어+일본어+독일어',
    80: '스페인어+독일어',
    81: '한국어+스페인어+독일어',
    82: '영어+스페인어+독일어',
    83: '한국어+영어+스페인어+독일어',
    84: '중국어+스페인어+독일어',
    85: '한국어+중국어+스페인어+독일어',
    86: '영어+중국어+스페인어+독일어',
    87: '한국어+영어+중국어+스페인어+독일어',
    88: '일본어+스페인어+독일어',
    89: '한국어+일본어+스페인어+독일어',
    90: '영어+일본어+스페인어+독일어',
    91: '한국어+영어+일본어+스페인어+독일어',
    92: '중국어+일본어+스페인어+독일어',
    93: '한국어+중국어+일본어+스페인어+독일어',
    94: '영어+중국어+일본어+스페인어+독일어',
    95: '한국어+영어+중국어+일본어+스페인어+독일어',
    96: '프랑스어+독일어',
    97: '한국어+프랑스어+독일어',
    98: '영어+프랑스어+독일어',
    99: '한국어+영어+프랑스어+독일어',
    100: '중국어+프랑스어+독일어',
    101: '한국어+중국어+프랑스어+독일어',
    102: '영어+중국어+프랑스어+독일어',
    103: '한국어+영어+중국어+프랑스어+독일어',
    104: '일본어+프랑스어+독일어',
    105: '한국어+일본어+프랑스어+독일어',
    106: '영어+일본어+프랑스어+독일어',
    107: '한국어+영어+일본어+프랑스어+독일어',
    108: '중국어+일본어+프랑스어+독일어',
    109: '한국어+중국어+일본어+프랑스어+독일어',
    110: '영어+중국어+일본어+프랑스어+독일어',
    111: '한국어+영어+중국어+일본어+프랑스어+독일어',
    112: '스페인어+프랑스어+독일어',
    113: '한국어+스페인어+프랑스어+독일어',
    114: '영어+스페인어+프랑스어+독일어',
    115: '한국어+영어+스페인어+프랑스어+독일어',
    116: '중국어+스페인어+프랑스어+독일어',
    117: '한국어+중국어+스페인어+프랑스어+독일어',
    118: '영어+중국어+스페인어+프랑스어+독일어',
    119: '한국어+영어+중국어+스페인어+프랑스어+독일어',
    120: '일본어+스페인어+프랑스어+독일어',
    121: '한국어+일본어+스페인어+프랑스어+독일어',
    122: '영어+일본어+스페인어+프랑스어+독일어',
    123: '한국어+영어+일본어+스페인어+프랑스어+독일어',
    124: '중국어+일본어+스페인어+프랑스어+독일어',
    125: '한국어+중국어+일본어+스페인어+프랑스어+독일어',
    126: '영어+중국어+일본어+스페인어+프랑스어+독일어',
    127: '한국어+영어+중국어+일본어+스페인어+프랑스어+독일어',
    128: 'etc'
  };
  return formatter[type];
};

export const keytagModeFormatter = (mode:0|1) => {
  const formatter = {
    0: '객실연동 X, 전원컨트롤 X',
    1: '객실연동 O, 전원컨트롤 O',
  };
  return formatter[mode];
};

//formatter에서 훅 사용이 제한적이라서 여기에 따로 옮김
const nameChange = (name:string) => {
  const startStr = name.substring(0,1);
  const endStr = name.substring(name.length-1);
  const newName = [];
  for(let i =0; i < name.length; i++){
    if(i === 0) newName.push(startStr);
    else if(i === name.length-1) newName.push(endStr);
    else newName.push('*');
  }
  name = '';
  return newName.join('');
}
const phoneChange = (phone:string) => {
  const newPhone = [phone.substring(0, phone.length-4)];
  for(let i =0; i < 4; i++){
    newPhone.push('*');
  }
  return newPhone.join('');
}
