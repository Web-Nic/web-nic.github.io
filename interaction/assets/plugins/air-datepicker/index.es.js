import AirDatepicker from '/assets/plugins/air-datepicker';

new AirDatepicker('.js-datePicker', {
    isMobile: true,
    autoClose: true,
    range: true,
    multipleDatesSeparator: ' - ',
    // dateFormat(date) {
    //     return date.toLocaleString('uk', {
    //         year: 'numeric',
    //         day: '2-digit',
    //         month: 'short'
    //     });
    // }
})
