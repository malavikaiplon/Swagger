export const getEmployeeList = () =>  {
  return [
        {
            id: 1,
            name: 'Malavika',
            Team: 'R&D',
            status:'Remote'
     }, 
    {
        id: 2,
        name: 'Vani',
        Team: 'R&D',
        status:'Available'     
      },
      {
        id: 3,
        name: 'Naveen',
        Team: 'R&D',
        status:'Away'     
      }
   ]
}


export const findEmployeeById = (id) =>{
const Employees = getEmployeeList()
   const EmployeeFound = Employees.filter((Employee) => {
        if (Employee.id === id) {
             return Employee
        }   
    });
   if(EmployeeFound.length>0){
        return EmployeeFound
    }
    return false

}