import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Css/date"

interface DatePickerModalProps {
  show: boolean;
  onClose: () => void;
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DatePickerModal: React.FC<DatePickerModalProps> = ({ show, onClose }) => {
  // For demo, default to June 2025
  const [month, setMonth] = useState(5); // 0-indexed, 5 = June
  const [year, setYear] = useState(2025);
  const [selectedDay, setSelectedDay] = useState(10);
  const [today] = useState(new Date());
  const [startDateChecked, setStartDateChecked] = useState(false);
  const [dueDateChecked, setDueDateChecked] = useState(true);
  const [reminder, setReminder] = useState('1 Day before');

  // Helper to get days in month
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  // Helper to get first day of week (0=Sun, 1=Mon...)
  const getFirstDayOfWeek = (y: number, m: number) => new Date(y, m, 1).getDay();

  // Calendar grid logic
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month); // 0=Sun
  // Trello calendar starts on Monday, so adjust
  const leadingEmpty = (firstDay + 6) % 7;
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

  // Build calendar grid
  const calendarDays: { day: number, otherMonth: boolean }[] = [];
  // Previous month's days
  for (let i = daysInPrevMonth - leadingEmpty + 1; i <= daysInPrevMonth; i++) {
    calendarDays.push({ day: i, otherMonth: true });
  }
  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, otherMonth: false });
  }
  // Next month's days
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push({ day: calendarDays.length - daysInMonth - leadingEmpty + 1, otherMonth: true });
  }

  // Handlers
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };
  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  const handleDayClick = (day: number, otherMonth: boolean) => {
    if (!otherMonth) setSelectedDay(day);
  };

  const handleSave = () => {
    alert('Settings saved!');
    onClose();
  };
  const handleRemove = () => {
    alert('Due date removed!');
    onClose();
  };

  // Format date for input
  const formattedDate = `${selectedDay.toString().padStart(2, '0')}/${(month+1).toString().padStart(2, '0')}/${year}`;
  const formattedTime = '07:19'; // static for demo

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Dates</h5>
            <button type="button" className="btn-close" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">
            {/* Calendar */}
            <div className="calendar-header">
              <button className="calendar-nav" onClick={handlePrevYear}>
                <i className="fas fa-angle-double-left"></i>
              </button>
              <button className="calendar-nav" onClick={handlePrevMonth}>
                <i className="fas fa-angle-left"></i>
              </button>
              <span className="calendar-month">{monthNames[month]} {year}</span>
              <button className="calendar-nav" onClick={handleNextMonth}>
                <i className="fas fa-angle-right"></i>
              </button>
              <button className="calendar-nav" onClick={handleNextYear}>
                <i className="fas fa-angle-double-right"></i>
              </button>
            </div>
            <div className="calendar-grid">
              {daysOfWeek.map((d) => (
                <div className="calendar-day-header" key={d}>{d}</div>
              ))}
              {calendarDays.map(({ day, otherMonth }, idx) => {
                // Today logic
                const isToday =
                  day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear() &&
                  !otherMonth;
                const isSelected = day === selectedDay && !otherMonth;
                return (
                  <button
                    key={idx}
                    className={`calendar-day${otherMonth ? ' other-month' : ''}${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}`}
                    onClick={() => handleDayClick(day, otherMonth)}
                    disabled={otherMonth}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            {/* Start Date */}
            <div className="form-section">
              <label className="form-label">Start date</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="startDateCheck"
                  checked={startDateChecked}
                  onChange={() => setStartDateChecked(!startDateChecked)}
                />
                <label className="form-check-label text-muted" htmlFor="startDateCheck">
                  D/M/YYYY
                </label>
              </div>
            </div>
            {/* Due Date */}
            <div className="form-section">
              <label className="form-label">Due date</label>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="dueDateCheck"
                  checked={dueDateChecked}
                  onChange={() => setDueDateChecked(!dueDateChecked)}
                />
              </div>
              <div className="date-time-group">
                <input type="text" className="form-control" value={formattedDate} readOnly />
                <input type="text" className="form-control" value={formattedTime} readOnly />
              </div>
            </div>
            {/* Reminder */}
            <div className="form-section">
              <label className="form-label">Set due date reminder</label>
              <div className="select-wrapper">
                <select
                  className="form-select"
                  value={reminder}
                  onChange={e => setReminder(e.target.value)}
                >
                  <option>1 Day before</option>
                  <option>2 Days before</option>
                  <option>1 Week before</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
            <p className="reminder-text">
              Reminders will be sent to all members and watchers of this card.
            </p>
            {/* Action Buttons */}
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={handleRemove}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;