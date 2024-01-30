import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

interface Data {
  _id: string;
}

class APIClient<T extends Data> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  get = () => {
    return axiosInstance.get<T>(this.endpoint).then(res => res.data);
  }

  delete = (id: string) => {
    return axiosInstance.delete(this.endpoint + '/' + id).then(res => res.data)
  }

  update = (data: T) => {
    return axiosInstance.put(this.endpoint, + '/' + data._id).then(res => res.data);
  }

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then(res => res.data);
  }

}

export default APIClient;
