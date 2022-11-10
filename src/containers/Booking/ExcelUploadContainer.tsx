import React, { useState, useEffect, Fragment, ChangeEvent, useCallback } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ExcelUpload from '../../components/Booking/ExcelUpload';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { changeResult, createExcelUploadAction } from '../../stores/booking';
import { ExcelUploadContainerProps } from '../../types/booking';

const ExcelUploadContainer = ({
  isOpen,
  toggle,
  reload,
}:ExcelUploadContainerProps) => {
  const dispatch = useDispatch();
  const { excelUploadSuccess, excelUploadError } = useSelector(({ booking }:RootState) => ({
    excelUploadSuccess: booking.excelUploadSuccess,
    excelUploadError: booking.excelUploadError,
  }));
  const [ isOpenExcelUploadSuccessModal, setIsOpenExcelUploadSuccessModal ] = useState<boolean>(false);
  const [ isOpenExcelUploadFailModal, setIsOpenExcelUploadFailModal ] = useState<boolean>(false);
  const [ messageExcelUploadFail, setMessageExcelUploadFail ] = useState<string>('');
  const [ selectedFileName, setSelectedFileName ] = useState<string>('');
  const [ formData, setFormData ] = useState<FormData|null>(null);

  const handleCreateBooking = useCallback(() => {
    if (!formData || !formData.get('file')) {
      setMessageExcelUploadFail('업로드 할 파일을 선택 해주세요.');
      setIsOpenExcelUploadFailModal(true);
    } else {
      dispatch(createExcelUploadAction({formData}));
    }
  },[dispatch, formData]);

  const handleSetFile = (e:ChangeEvent<HTMLInputElement>) => {
    const file:File|null = e.target.files? e.target.files[0] : null;
    if (file) {
      setSelectedFileName(file.name);
      if(formData) formData.set('file', file);
    }
  }

  useEffect(() => {
    if(excelUploadError){
      if (!excelUploadError.response) setMessageExcelUploadFail(excelUploadError.message);
      else setMessageExcelUploadFail(`${excelUploadError.response.data.code}, ${excelUploadError.response.data.message}`);

      if(excelUploadError.response.data.code === 401 || excelUploadError.response.data.code === 419) reload();
      else setIsOpenExcelUploadFailModal(true);
      dispatch(changeResult({
        key: 'excelUploadError',
        value: null
      }));
    }
    if(excelUploadSuccess){
      reload();
      toggle();
      setIsOpenExcelUploadSuccessModal(true);
      dispatch(changeResult({
        key: 'excelUploadSuccess',
        value: false
      }));
    }
  },[excelUploadSuccess, excelUploadError, reload, toggle, dispatch]);

  useEffect(() => {
    setFormData(new FormData());
  }, [isOpen]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
        size='sm'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <ExcelUpload 
            selectedFileName={selectedFileName}
            handleSetFile={handleSetFile}
            handleCreateBooking={handleCreateBooking}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenExcelUploadSuccessModal}
        toggle={() => setIsOpenExcelUploadSuccessModal(!isOpenExcelUploadSuccessModal)}
        message='Excel 파일 업로드에 성공 하였습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenExcelUploadFailModal}
        toggle={() => setIsOpenExcelUploadFailModal(!isOpenExcelUploadFailModal)}
        message={messageExcelUploadFail || 'Excel 파일 업로드에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default ExcelUploadContainer;