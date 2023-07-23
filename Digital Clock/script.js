function updateTime() {
    const now = new Date();
  
    // Get time parts
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
  
    // Set AM or PM
    const amPm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert to 12-hour time
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    // Pad single digit numbers with a leading zero
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    // Format the time string
    const time = `${hours}:${minutes}:${seconds} ${amPm}`;
  
    // Get date parts
    const day = now.getDate();
    const year = now.getFullYear();
  
    // Get day of the week and month by name
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[now.getDay()];
  
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[now.getMonth()];
  
    // Format the date string
    const date = `${dayOfWeek}, ${day} ${month} ${year}`;
  
    // Set the time and date
    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = date;
  }
  
  // Update the time and date right away, then every second
  updateTime();
  setInterval(updateTime, 1000);
  