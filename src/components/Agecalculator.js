import React from 'react';
import './agecalculator.style.css';
import Header from './Header';
import Input from './Input';
import Output from './Output';

export class Agecalculator extends React.Component {
    state = {
        message: '',
        year: '-',
        month: '-',
        day: '-',
        birthday: '',
    };

    reset = (e) => {
        e.preventDefault();

        this.setState({
            message: 'Input your birthday',
            year: '-',
            month: '-',
            day: '-',
        });
        e.target.reset();
    };

    change = (e) => {
        const { birthday } = this.state;

        this.setState({ birthday: new Date(e.target.value) });
        console.log(birthday);
    };

    click = (e) => {
        const { birthday } = this.state;
        const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (birthday === '') {
            this.setState({ message: 'Input your birthday' });
        } else {
            const today = new Date();
            const inputDate = new Date(birthday);
            let birthMonth;
            let birthDate;
            let birthYear;
            const birthDetails = {
                date: inputDate.getDate(),
                month: inputDate.getMonth() + 1,
                year: inputDate.getFullYear(),
            };
            const currentYear = today.getFullYear();
            if (currentYear % 4 === 0 || (currentYear % 400 === 0 && currentYear % 100 !== 0)) {
                months[1] = 29;
            } else {
                months[1] = 28;
            }
            const currentMonth = today.getMonth() + 1;
            const currentDate = today.getDate();
            // Not Born check
            if (
                birthDetails.year > currentYear ||
                (birthDetails.month > currentMonth && birthDetails.year === currentYear) ||
                (birthDetails.date > currentDate && birthDetails.year === currentYear)
            ) {
                this.setState({ message: 'You are not born yet' });
                e.preventDefault();
                e.target.reset();
            }
            // Calculate Birth Year
            birthYear = currentYear - birthDetails.year;
            // Calculate Birth Month
            if (currentMonth >= birthDetails.month) {
                birthMonth = currentMonth - birthDetails.month;
            } else {
                birthYear -= 1;
                birthMonth = 12 + currentMonth - birthDetails.month;
            }
            // Calculate Birth Date
            if (currentDate >= birthDetails.date) {
                birthDate = currentDate - birthDetails.date;
            } else {
                birthMonth -= 1;
                const days = months[currentMonth - 2];
                birthDate = days + currentDate - birthDetails.date;
                if (birthMonth < 0) {
                    birthMonth = 11;
                    birthYear -= 1;
                }
            }

            this.setState({
                year: birthYear,
                month: birthMonth,
                day: birthDate,
                message: `You're ${birthYear} years, ${birthMonth} months, ${birthDate} days old`,
            });
        }
    };

    render() {
        const { message, year, month, day } = this.state;

        return (
            <div className="container">
                <Header onReset={this.reset} />
                <Input onClick={this.click} onChange={this.change} />
                <Output year={year} month={month} day={day} />
                <p id="message">{message}</p>
            </div>
        );
    }
}

export default Agecalculator;
