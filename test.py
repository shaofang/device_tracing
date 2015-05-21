#! /usr/bin/env python
import urllib
import urllib2
import json

import httplib
import time


url = 'http://localhost:3000/notes'

def http_post():
  values = {'title':'Title'}
  jdata = json.dumps(values)


  #data = urllib.urlencode(values)
  print jdata
  req = urllib2.Request(url, jdata)

  response = urllib2.urlopen(req)
  return response.read()

def http_get():
  res = urllib2.urlopen(url)
  return res.read()

def httplib_post():
  values = {'sn':'abcd1234', 'start': time.ctime(), 'tag':'A1', 'type':'battery', 'value':'50'}
  jdata = json.dumps(values)
  headers = {"Content-type": "application/json"}
  con = httplib.HTTPConnection('localhost', 3000, True)
  con.request('POST', '/notes', jdata, headers)
  res = con.getresponse()
  return res.read()

#print http_post()
#print http_get()
#print http_post()
print httplib_post()