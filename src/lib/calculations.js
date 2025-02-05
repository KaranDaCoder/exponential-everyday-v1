export const validateDates = (date1, date2) => {
 if (date1 > date2) {
  return { success: false, trackerSuccess: false, message: `INVALID DATE. start date is in the past : ${date2}, invalid. Today is ${date1}` }
 } else if (date1 < date2) {
  return { success: true, trackerSuccess: false, status: 'UPCOMING', message: `VALID DATE. start date is in the Future : ${date2}, . Today is ${date1}` }
 }
 return { success: true, trackerSuccess: true, status: 'ACTIVE', message: `VALID DATE. start date is same as today : ${date2}. Today is ${date1}` }
}

export const calculateHabitMetric = (difficulty) => {
 try {
  if (difficulty >= 10) {
   return {
    calc_start_strength: 'FLYING'
   };
  } else if (difficulty >= 8) {
   return {
    calc_start_strength: 'SPRINTING'
   };
  } else if (difficulty >= 5) {
   return {
    calc_start_strength: 'RUNNING'
   };
  } else if (difficulty >= 3) {
   return {
    calc_start_strength: 'WALKING'
   };
  } else {
   return {
    calc_start_strength: 'CRAWLING'
   };
  }
 } catch (error) {
   console.log(`ERRROR` , error);
   throw Error(`CALCULATION ERROR`)
 }
 
};

export const reduceData = (data) => {
 return data.reduce((acc, { _count, status }) => {
  acc[status] = _count?.id || 0;
  return acc;
 }, {});
};

