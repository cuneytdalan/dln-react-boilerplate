import React, {FunctionComponent, useState} from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {UserInformation} from "./userInformation";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentLanguage} from "../../store/language/languageReducer";

type HeaderType = {
    appIcon?: string;
    userInfo?: any;
    showUserInfo?: boolean;
    showMenuItems?: boolean;
    onCollapseButtonClicked?: any;
    appLogoWidth: number,
    collapsable?: boolean;
}

export const Header: FunctionComponent<HeaderType> = (props) => {
    const {
        showMenuItems,
        onCollapseButtonClicked,
        appLogoWidth,
        userInfo,
        collapsable
    } = props;
    const headerTitle = 'Company';
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapseToggleButtonClicked = () => {
        setCollapsed(!collapsed);
        onCollapseButtonClicked(collapsed);
    }

    const renderCollapsedButton = () => {
        if (!collapsable) {
            return;
        }
        return collapsed
            ? <MenuUnfoldOutlined onClick={handleCollapseToggleButtonClicked}/>
            : <MenuFoldOutlined onClick={handleCollapseToggleButtonClicked}/>
    }

    const renderCollapsedAppIcon = () => {
        return <div className="header-logo">
            <div style={{width: appLogoWidth}} className={collapsed ? 'collapsed' : ''}>
                <span>LOGO</span>
                <a href="/">{!collapsed ? headerTitle : ''}</a>
            </div>
        </div>
    }

    const renderHeaderMenu = () => {
        if (!showMenuItems) {
            return;
        }
        return <nav>
            <a href="#">Home</a>
            <a href="#" className="selected">Blog</a>
            <a href="#">Pricing</a>
            <a href="#">About</a>
            <a href="#">Faq</a>
            <a href="#">Contact</a>
        </nav>
    }

    const renderUserInformation = () => {
        if (!userInfo) {
            return;
        }
        return <UserInformation user={userInfo}/>
    }

    return <header className="header-container">
        <div className="header">
            {renderCollapsedAppIcon()}
            <div className="collapse-menu-container">
                {renderCollapsedButton()}
            </div>
            <div className="header-menu">
                {renderHeaderMenu()}
            </div>
            {renderUserInformation()}
        </div>
    </header>
}
