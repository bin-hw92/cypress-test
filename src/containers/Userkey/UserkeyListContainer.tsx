import React, { useState, useEffect, Fragment, useCallback } from 'react';
import Pagination from '../../components/Commons/TablePagination';
import UserkeyIssueContainer from './UserkeyIssueContainer';
import { SMSSendContainer } from '../Commons/SMSSendContainer';
import UserkeyList from '../../components/Userkey/UserkeyList';
import UserkeyDeleteContainer from './UserkeyDeleteContainer';
import { useDispatch, useSelector} from 'react-redux';
import { changeAllField } from '../../stores/sms';
import { UserkeyListContainerProps } from '../../types/userkey';
import { RootState } from '../../stores';
import { selectRoomIdAction } from '../../stores/room';

const UserkeyListContainer = ({
  buildingId,
  bookingId,
  roomId,
  roomName,
  userkeyListItems,
  allowInfinityPincode,
  userRole,
  reload,
  handleGoBack,
}:UserkeyListContainerProps) => {
  const dispatch = useDispatch();
  const { roomDoorlockItems } = useSelector(({ room }:RootState) => ({
    roomDoorlockItems: room.room.doorlock,
  }));
  const [ isOpenKeyIssueModal, setIsOpenKeyIssueModal ] = useState<boolean>(false);
  const [ isOpenKeyDeleteModal, setIsOpenKeyDeleteModal ] = useState<boolean>(false);
  const [ isOpenSMSSendModal, setIsOpenSMSSendModal ] = useState<boolean>(false);
  const [ paginationItem, setPaginationItem ] = useState<any>({
    offset: 0,
    limit: 10,
  });
  const [ selectedKeyId, setSelectedKeyId ] = useState<string|null>(null);
  const [ currentPageNumber, setCurrentPageNumber ] = useState<number>(1);

  const handleSelectRoom = useCallback(() => {
    if(buildingId) dispatch(selectRoomIdAction({buildingId, roomId}));
  },[buildingId, dispatch, roomId]);

  const changePagination = (pageNumber:number) => {
    setCurrentPageNumber(pageNumber);
    setPaginationItem({
      ...paginationItem,
      offset: (pageNumber - 1) * paginationItem.limit,
    });
  };

  const handleSelectMobilekeyDelete = (keyId:string, pincode:string) => {
    if (pincode) return;
    setSelectedKeyId(keyId);
    setIsOpenKeyDeleteModal(true);
  };

  const handleSelectSMSSend = (pincodeId:string, pincode:string, userId:string, exchangekey:string) => {
    if (!pincode && !exchangekey) return;
    if (pincode) {
      dispatch(changeAllField({
        sms: {
          type: 'pincode',
          value: pincode,
          keyId: pincodeId,
        }
      }));
    } else {
      dispatch(changeAllField({
        sms: {
          type: 'mobilekey',
          value: exchangekey,
          keyId: userId,
        }
      }));
    }
    setIsOpenSMSSendModal(true);
  };

  const handleKeyIssue = () => {
      setIsOpenKeyIssueModal(true);
  }

  const handleReload = () => {
    reload();
    setIsOpenSMSSendModal(!isOpenSMSSendModal);
  }

  useEffect(() => {
    if (buildingId) handleSelectRoom();
  }, [handleSelectRoom, buildingId]);

  return (
    <Fragment>
      <div>
        <UserkeyList 
          userkeyListItems={userkeyListItems}
          pincodeVersion={roomDoorlockItems? roomDoorlockItems.pincodeVersion : ''}
          userRole={userRole}
          handleGoBack={handleGoBack}
          handleKeyIssue={handleKeyIssue}
          handleSelectMobilekeyDelete={handleSelectMobilekeyDelete}
          handleSelectSMSSend={handleSelectSMSSend}
        />
        <Pagination
          total={userkeyListItems.length}
          index={currentPageNumber}
          limit={paginationItem.limit}
          indexChange={changePagination}
        />
      </div>
      {isOpenKeyIssueModal &&
        <UserkeyIssueContainer
          isOpen={isOpenKeyIssueModal}
          toggle={() => setIsOpenKeyIssueModal(!isOpenKeyIssueModal)}
          reload={reload}
          buildingId={buildingId}
          bookingId={bookingId}
          roomId={roomId}
          roomName={roomName}
          allowInfinityPincode={allowInfinityPincode}
        />
      }
      <UserkeyDeleteContainer
        isOpen={isOpenKeyDeleteModal}
        toggle={() => setIsOpenKeyDeleteModal(!isOpenKeyDeleteModal)}
        reload={reload}
        bookingId={bookingId}
        keyId={selectedKeyId? selectedKeyId : ''}
      />
      {!isOpenKeyIssueModal &&
        <SMSSendContainer
          isOpen={isOpenSMSSendModal}
          isResend={true}
          toggle={() => setIsOpenSMSSendModal(!isOpenSMSSendModal)}
          bookingId={bookingId}
          reload={handleReload}
        />
      }
    </Fragment>
  );
};

export default UserkeyListContainer;