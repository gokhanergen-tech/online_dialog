import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Modal from '../modal/modal'

import styles from './settings.module.css'
const Settings = () => {

  const [devicesVideo, setVideoDevices] = useState([])
  const [devicesAudio, setAudioDevices] = useState([])
  const [selectedAudio,setSelectedAudio]=useState("")
  const [selectedVideo,setSelectedVideo]=useState("")

  useEffect(() => {
    const getDevices=()=>{
      const getAllVideoDevices = async () => {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = mediaDevices.filter(device => device.kind === "videoinput")
        const audioDevices = mediaDevices.filter(device => device.kind === "audioinput")
        const mappedVideoDevices = videoDevices.map(device => ({ deviceId: device.deviceId, name: device.label }))
        const mappedAudioDevices = audioDevices.map(device => ({ deviceId: device.deviceId, name: device.label }))
        setVideoDevices(mappedVideoDevices)
        setAudioDevices(mappedAudioDevices)
      }
      getAllVideoDevices();
    }
    const modal=document.getElementById("settings_modal");
    modal.addEventListener("shown.bs.modal",getDevices)

    setSelectedAudio(window.localStorage.getItem("audioDeviceId"))
    setSelectedVideo(window.localStorage.getItem("videoDeviceId"))

    return ()=>{
      modal.removeEventListener("shown.bs.modal",getDevices)
    }
  }, [])

  return (
    ReactDOM.createPortal((<Modal id={"settings_modal"}>
      <div className={"modal-content show"}>
        <div className="modal-header border-0">
          <span className={"modal-title " + styles.titleModal}>Settings</span>
          <button className={styles.cancelModalButton} data-bs-dismiss="modal">Close</button>
        </div>
        <div className='modal-body'>
          <div className='row justify-content-center'>
            <div className='col-8'>
              <label htmlFor='selectVideo' className={styles.deviceTitle}>
                Video device
              </label>
              <div>
                <select id="selectVideo" className={styles.select} value={selectedVideo||""} onChange={(e) => {
                  const deviceId = e.target.value;
                  if (deviceId) {
                    window.localStorage.setItem("videoDeviceId", deviceId);
                    setSelectedVideo(deviceId)
                  }
                }}>
                  {
                    devicesVideo.map(device => <option key={device.deviceId} value={device.deviceId}>
                      {
                        device.name
                      }
                    </option>)
                  }
                </select>
              </div>
            </div>
            <div className='col-8'>
              <label htmlFor='selectAudio' className={styles.deviceTitle}>
                Audio device
              </label>
              <div>
                <select id="selectAudio" className={styles.select} value={selectedAudio||""} onChange={(e) => {
                  const deviceId = e.target.value;
                  if (deviceId) {
                    window.localStorage.setItem("audioDeviceId", deviceId);
                    setSelectedAudio(deviceId)
                  }
                }}>
                  {
                    devicesAudio.map(device => <option key={device.deviceId} value={device.deviceId}>
                      {
                        device.name
                      }
                    </option>)
                  }
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Modal>), document.getElementById("modalBase"))
  )
}

export default React.memo(Settings)