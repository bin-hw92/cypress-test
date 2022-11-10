import styled from "styled-components";
import { LeftMenuProps } from "../../types/commons";

/* styled */
const LeftMenuWrap = styled.aside`
    float: left;
    width: 239px;
    height: calc(100vh - 6.25rem);
    background: #ffffff;
    
    @media (max-height: 530px) {
      min-height: 530px;
    }
`;
const LeftMenuContent = styled.ul`
    margin: auto;
    padding: 0;

    li {
        padding: 0.9375rem 1.25rem;
        font-weight: 600;
        cursor: pointer;

        div {
            padding: 1.125rem 1.125rem 1.125rem 2.25rem;
            :hover {
                background: #ffffff;
            }
        }
        :hover {
            background: #F7F9FB;
        }
        &.menu-sub-item {
            padding: 0;

            .item-on {
                color: #4c9ffe;
            }
        }
        &.item-on {
            background: #F7F9FB;
            color: #4c9ffe;
        }
    }
`;

const LeftMenu = ({
    menuItem,
    homeMenuItem,
    hotelRole,
    userName,
    userRole,
    handleMenuItem,
    handleHomeMenuItem,
}:LeftMenuProps) => {
    
    return menuItem === ''? (
        <LeftMenuWrap>
            <LeftMenuContent>
                <li className={`menu-item ${homeMenuItem === 'dashboard' ? 'item-on':''}`}
                    onClick={() => handleHomeMenuItem('dashboard')}>대시보드</li>
                <li className={`menu-item ${homeMenuItem === '' ? 'item-on':''}`}
                    onClick={() => handleHomeMenuItem('')}>단지 관리</li>
                <li className={`menu-item ${homeMenuItem === 'template' || homeMenuItem === 'hotelnotify' ? 'item-on':''}`}
                    onClick={() => handleHomeMenuItem('template')}>알림 템플릿</li>
            {(homeMenuItem === 'template' || homeMenuItem === 'hotelnotify') && (
                <>
                <li className="menu-sub-item" onClick={() => handleHomeMenuItem('template')}>
                    <div className={`sub-item ${homeMenuItem === 'template'? 'item-on':''}`}>알림 템플릿 목록</div>
                </li>
                <li className="menu-sub-item" onClick={() => handleHomeMenuItem('hotelnotify')}>
                    <div className={`sub-item ${homeMenuItem === 'hotelnotify'? 'item-on':''}`}>단지 알림 템플릿 목록</div>
                </li>
                </>
            )}
                <li className={`menu-item ${homeMenuItem === 'channel' ? 'item-on':''}`}
                    onClick={() => handleHomeMenuItem('channel')}>알림 채널</li>
            {userName === 'Oauth' && userRole === 'master' && 
                <li className={`menu-item ${homeMenuItem === 'doorlock' ? 'item-on':''}`}
                    onClick={() => handleHomeMenuItem('doorlock')}>도어락 목록</li>
            }
            </LeftMenuContent>
        </LeftMenuWrap>
        ):(
            <LeftMenuWrap>
                <LeftMenuContent>
                {hotelRole === 'master' && 
                    <>
                    <li className={`menu-item ${menuItem === 'dashboard' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('dashboard')}>대시보드
                    </li>
                    <li className={`menu-item ${menuItem === 'hotel' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('hotel')}>단지 정보
                    </li>
                    <li className={`menu-item ${menuItem === 'building' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('building')}>빌딩 목록
                    </li>
                    <li className={`menu-item ${menuItem === 'floor' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('floor')}>층 목록
                    </li>
                    <li className={`menu-item ${menuItem === 'room' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('room')}>객실 목록
                    </li>
                    <li className={`menu-item ${menuItem === 'doorlock' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('doorlock')}>도어락 목록
                    </li>
                    <li className={`menu-item ${menuItem === 'booking' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('booking')}>예약 목록
                    </li>
                    <li className={`menu-item ${menuItem === 'staff' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('staff')}>스태프 목록
                    </li>
                    <li className={`menu-item ${menuItem === 'hotelnotify' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('hotelnotify')}>알림 템플릿
                    </li>
                    <li className={`menu-item ${menuItem === 'report' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('report')}>리포트
                    </li> 
                    </>}
                    {hotelRole !== 'master' && 
                    <>
                    <li className={`menu-item ${menuItem === 'dashboard' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('dashboard')}>대시보드
                    </li>
                    <li className={`menu-item ${menuItem === 'doorlock' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('doorlock')}>도어락 목록
                    </li>
                    <li className={`menu-item ${menuItem === 'booking' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('booking')}>예약 목록
                    </li>
                    <li className={`menu-item ${menuItem === 'staff' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('staff')}>스태프 목록
                    </li>
                    <li className={`menu-item ${menuItem === 'report' ? 'item-on':''}`}
                        onClick={() => handleMenuItem('report')}>리포트
                    </li> 
                    </>}
                </LeftMenuContent>
            </LeftMenuWrap>
        )
}

export default LeftMenu;