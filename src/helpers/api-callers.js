import axios from "axios";

export const getCarModels = async () => {
  try {
    const _response = await axios.get("/utility/car-models");

    if (_response.status === 200) {
      const { data } = _response;

      let _carModels = [];

      data.forEach((_carModel) => {
        _carModels.push({
          label: _carModel.name,
          value: _carModel.name,
        });
      });

      return _carModels;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCarColors = async () => {
  try {
    const _response = await axios.get("/utility/car-colors");

    if (_response.status === 200) {
      const { data } = _response;

      let _carColors = [];

      data.forEach((_carColor) => {
        _carColors.push({
          label: _carColor.name,
          value: _carColor.name,
        });
      });

      return _carColors;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPlateEmirates = async () => {
  try {
    const _response = await axios.get("/utility/plate-emirates");

    if (_response.status === 200) {
      const { data } = _response;

      let _plateEmirates = [];

      data.forEach((_plateEmirate) => {
        _plateEmirates.push({
          label: _plateEmirate.name,
          value: _plateEmirate.name,
        });
      });

      return _plateEmirates;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPlateCodes = async () => {
  try {
    const _response = await axios.get("/utility/plate-codes");

    if (_response.status === 200) {
      const { data } = _response;

      let _plateCodes = [];

      data.forEach((_plateCode) => {
        _plateCodes.push({
          label: _plateCode.name,
          value: _plateCode.name,
          emirate: _plateCode.plateEmirate.name,
        });
      });

      return _plateCodes;
    }
  } catch (err) {
    console.log(err);
  }
};

export const addNewCar = async (formData, id) => {
  try {
    const {
      carModel,
      carColor,
      carYear,
      plateEmirate,
      plateCode,
      plateNumber,
      vinNumber,
    } = formData;

    const body = {
      id,
      cars: {
        carModel,
        carColor,
        carYear,
        plateEmirate,
        plateCode,
        plateNumber,
        vinNumber,
      },
    };

    const _response = await axios.post("/cars/", body);

    if (_response.status === 200) {
      return _response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCurrentUsersCars = async (id) => {
  try {
    const _response = await axios.get(`/members/${id}`);

    if (_response.status === 200) {
      const { cars } = _response;

      let _cars = [];

      cars.forEach((_car) => {
        _cars.push({
          carModel: _car.carModel,
          carColor: _car.carColor,
          carYear: _car.carYear,
          plateCode: _car.plateCode,
          plateNumber: _car.plateNumber,
          plateEmirate: _car.plateEmirate,
          vinNumber: _car.vinNumber,
        });
      });

      return _cars;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (id, formData) => {
  try {
    const { mobileNumber, whatsAppNumber, emailAddress, instagramName } =
      formData;

    let body = {
      id,
      mobileNumber,
      whatsAppNumber,
      emailAddress,
      instagramName,
    };

    const _response = await axios.patch("/members/", body);

    if (_response.status === 200) {
      const { data } = _response;
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllEvents = async () => {
  try {
    const _response = await axios.get("/events");

    if (_response.status === 200) {
      const { data } = _response;

      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
