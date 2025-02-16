let isArray = require('./array');


test("data should be an array", ()=>{
    const data = { name: "Zabih", lastName: "Namazi" };
    expect(isArray(data)).toEqual([]);
});

test("arrData should return as it is an array", () => {
    const arrData = [{ name: "Zabih", lastName: "Namazi" }];
    expect(isArray(arrData)).toEqual(arrData);
  });
