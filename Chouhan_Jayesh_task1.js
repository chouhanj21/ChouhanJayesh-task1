// Input data (format1)
const format1 = [
    {
      city: 'Mumbai',
      data: [
        { id: 'AA01', name: 'Ankit' },
        { id: 'AA02', name: 'Amit' }
      ]
    },
    {
      city: 'Mumbai',
      data: [
        { id: 'AA01', age: 30 },
        { id: 'AA02', age: 40 }
      ]
    },
    {
      city: 'Delhi',
      data: [
        { id: 'RR01', name: 'Ram' },
        { id: 'RR02', name: 'Rita' }
      ]
    },
    {
      city: 'Delhi',
      data: { id: 'RR02', age: 23 }
    },
    {
      city: 'Pune',
      data: { id: 'SS01', name: 'Sejal' }
    },
    {
      city: 'Pune',
      data: {}
    },
    {
      city: 'Banglore',
      data: {}
    }
  ];
  
  // Function to merge and transform data
  const transformData = (input) => {
    const result = [];
    const cityData = {};
  
    // Step 1: Organize data by city and id
    input.forEach(entry => {
      const { city, data } = entry;
      
      if (!cityData[city]) {
        cityData[city] = [];
      }
  
      if (Array.isArray(data)) {
        cityData[city] = cityData[city].concat(data);
      } else if (data && data.id) {
        cityData[city].push(data);
      }
    });
  
    // Step 2: Merge name and age data, and create final result
    let sr = 0;
    Object.keys(cityData).forEach(city => {
      const cityItems = cityData[city];
  
      const merged = {};
      cityItems.forEach(item => {
        const id = item.id;
        if (!merged[id]) {
          merged[id] = { ...item, city };
        } else {
          Object.assign(merged[id], item);
        }
      });
  
      Object.keys(merged).forEach(id => {
        result.push({
          sr: sr++,
          id,
          city: merged[id].city,
          name: merged[id].name,
          age: merged[id].age
        });
      });
    });
  
    return result;
  };
  
  // Convert the data
  const format2 = transformData(format1);
  console.log(JSON.stringify(format2, null, 2));
  