export const useOrigin = (str:string) => {
  return str;
}
//그냥 이름만 사용시
export const useNameTableChange = (name:string) => {
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
export const usePhoneTableChange = (phone:string) => {
  const newPhone = [phone.substring(0, phone.length-4)];
  for(let i =0; i < 4; i++){
    newPhone.push('*');
  }
  return newPhone.join('');
}
export const useNamePhoneTableChange = (name:string, phone:string) => {
  const startStr = name.substring(0,1);
  const endStr = name.substring(name.length-1);
  const newName = [];
  const newPhone = [phone.substring(0, phone.length-4)];
  for(let i =0; i < name.length; i++){
    if(i === 0) newName.push(startStr);
    else if(i === name.length-1) newName.push(endStr);
    else newName.push('*');
  }
  for(let i =0; i < 4; i++){
    newPhone.push('*');
  }
  return `${newName.join('')}(${newPhone.join('')})`;
}
export const useNameDetailChange = (name:string, role:string) => {
  if(role === 'master') return name;

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
export const usePhoneDetailChange = (phone:string, role:string) => {
  if(role === 'master') return phone;

  const newPhone = [phone.substring(0, phone.length-4)];
  for(let i =0; i < 4; i++){
    newPhone.push('*');
  }
  return newPhone.join('');
}
