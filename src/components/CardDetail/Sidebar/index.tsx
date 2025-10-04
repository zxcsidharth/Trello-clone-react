import React, { useState } from 'react';
import './Css/sideButtons.css';

const menuItems = [
  { id: 'join', icon: 'fa fa-user-plus', label: 'Join', section: 'main' },
  { id: 'members', icon: 'fa fa-users', label: 'Members', section: 'main' },
  { id: 'labels', icon: 'fa fa-tag', label: 'Labels', section: 'main' },
  { id: 'checklist', icon: 'fa fa-check-square', label: 'Checklist', section: 'main' },
  { id: 'dates', icon: 'fa fa-calendar', label: 'Dates', section: 'main' },
  { id: 'attachment', icon: 'fa fa-paperclip', label: 'Attachment', section: 'main' },
  { id: 'cover', icon: 'fa fa-picture-o', label: 'Cover', section: 'main' },
  { id: 'custom-fields', icon: 'fa fa-cog', label: 'Custom Fields', section: 'main' }
];

const powerUpItems = [
  { id: 'add-power-ups', icon: 'fa fa-plus', label: 'Add Power-Ups', section: 'power-ups' }
];

const automationItems = [
  { id: 'add-button', icon: 'fa fa-plus', label: 'Add button', section: 'automation' }
];

const actionItems = [
  { id: 'move', icon: 'fa fa-arrow-right', label: 'Move', section: 'actions' },
  { id: 'copy', icon: 'fa fa-copy', label: 'Copy', section: 'actions' },
  { id: 'mirror', icon: 'fa fa-square-o', label: 'Mirror', badge: 'NEW', section: 'actions' },
  { id: 'template', icon: 'fa fa-file-text-o', label: 'Make template', section: 'actions' },
  { id: 'archive', icon: 'fa fa-archive', label: 'Archive', section: 'actions' },
  { id: 'share', icon: 'fa fa-share-alt', label: 'Share', section: 'actions' }
];

type MenuItemProps = { item: any, isHovered: boolean, onHover: () => void, onLeave: () => void }

const MenuItem = ({ item, isHovered, onHover, onLeave }: MenuItemProps) => {
    return (
      <div
        className={`menu-item ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className="menu-item-content">
          <i className={`${item.icon} menu-icon`}></i>
          <span className="menu-label">{item.label}</span>
          {item.badge && (
            <span className="badge-new">{item.badge}</span>
          )}
        </div>
      </div>
    );
  };

const SidebarMenu = () => {
  const [hoveredItem, setHoveredItem] = useState<string>("");
  

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="section-header">
      <span className="section-title">{title}</span>
    </div>
  );

  return (
    <div className="sidebar-menu">
      
      {/* Main menu items */}
      <div className="menu-section">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isHovered={hoveredItem === item.id}
            onHover={() => setHoveredItem(item.id)}
            onLeave={() => setHoveredItem("")}
          />
        ))}
      </div>

      {/* Power-Ups section */}
      <div className="menu-section">
        <SectionHeader title="Power-Ups" />
        {powerUpItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isHovered={hoveredItem === item.id}
            onHover={() => setHoveredItem(item.id)}
            onLeave={() => setHoveredItem("")}
          />
        ))}
      </div>

      {/* Automation section */}
      <div className="menu-section">
        <SectionHeader title="Automation" />
        {automationItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isHovered={hoveredItem === item.id}
            onHover={() => setHoveredItem(item.id)}
            onLeave={() => setHoveredItem("")}
          />
        ))}
      </div>

      {/* Actions section */}
      <div className="menu-section">
        <SectionHeader title="Actions" />
        {actionItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isHovered={hoveredItem === item.id}
            onHover={() => setHoveredItem(item.id)}
            onLeave={() => setHoveredItem("")}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarMenu;



// Please improve these below listed points:-

// When clicking on description box it is opening the description editor, instead of natively coding the editor, please use some popular react packages for editor box.

// this in list "DOING/TO DO" is not lookins exactly same as it is in the original image. (check the image i have attached, i need exactly same as the attached image)

// Show detail button is also not looking like it is requested in the original image, (i have attached the original requested UI image below).