import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinkCard} from '../components/LinkCard'

export const DetallPage = () => {
  console.log('DetallPage')
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  console.log('linkId', linkId)

  const getLink = useCallback(async () => {
    console.log('Detall')
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      console.log('fetched', fetched)
      setLink(fetched);
    } catch (error) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink])

  if(loading) {
    return <Loader />
  }

  return (
    <div>
      {!loading && link && <LinkCard link={link}/>}
    </div>
  )
}
