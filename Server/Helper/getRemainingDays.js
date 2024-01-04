module.exports = function getRemainingDates() {
   const today = new Date();
   const currentYear = today.getFullYear();
   const currentMonth = today.getMonth();
 
   // Get the last day of the current month
   const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
 
   // Generate an array of remaining dates
   const remainingDates = [];
   for (let day = today.getDate(); day <= lastDayOfMonth; day++) {
     const date = new Date(currentYear, currentMonth, day);
     remainingDates.push(date.toDateString());
   }
 
   return remainingDates;
}