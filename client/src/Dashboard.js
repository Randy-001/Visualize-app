import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap'
import { Bar, Line, Radar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
const Dashboard = () => {
  const [datavisual, setdatavisual] = useState('')
  const [datafilter, setdatafilter] = useState('')
  const [a, seta] = useState([])
  const [r, setr] = useState({})
  const [i, seti] = useState({})
  const [l, setl] = useState({})
  const [load, setload] = useState(false)
  let rel = []
  let intensity = []
  let like = []
  let data = []
  let filter = {}
  useEffect(() => {

    fetch('http://localhost:4000/dashboard', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        return res.json();
      }).then((re) => {
        seta(re.data)
        //console.log("a useeffect" + a)
      })
  }, [])
  //console.log("count"+a.length())
  const handlesubmit = (e) => {
    e.preventDefault()
    //console.log("a"+a)
    rel = []
    intensity = []
    like = []
    data = []
    filter = {}
    for (let i of a) {
      if (i[`${datavisual}`] !== "") {
        if (i[`${datavisual}`] in filter) {
          filter[i[`${datavisual}`.toUpperCase()]][0] = filter[i[`${datavisual}`.toUpperCase()]][0] + i.relevance
          filter[i[`${datavisual}`.toUpperCase()]][1] = filter[i[`${datavisual}`.toUpperCase()]][1] + i.intensity
          filter[i[`${datavisual}`.toUpperCase()]][2] = filter[i[`${datavisual}`.toUpperCase()]][2] + i.likelihood
          filter[i[`${datavisual}`.toUpperCase()]][3] = filter[i[`${datavisual}`.toUpperCase()]][3] + 1
        }
        else {
          filter[i[`${datavisual}`].toUpperCase()] = [i.relevance, i.intensity, i.likelihood, 1]
        }
      }
    }
    for (let k in filter) {
      data.push(k)
      rel.push(filter[k][0] / filter[k][3])
      intensity.push(Math.floor(filter[k][1] / filter[k][3]))
      like.push(Math.floor(filter[k][2] / filter[k][3]))
    }
    //console.log(rel)
    //console.log(intensity)
    //console.log(like)
    setr({

      labels: data,
      datasets: [
        {
          axis: 'y',
          label: "RELEVANCE",
          data: rel,
          backgroundColor: "red"

        },
      ],
    })
    seti({

      labels: data,
      datasets: [
        {
          axis: 'y',
          label: "INTENSITY",
          data: intensity,
          backgroundColor: "blue"

        },
      ],
    })
    setl({

      labels: data,
      datasets: [
        {
          axis: 'y',
          label: "LIKELIHOOD",
          data: like,
          backgroundColor: "yellow"

        },
      ],
    })
    setload(true)


  }
  const handlefiltersubmit=(e)=>{
    e.preventDefault()
    rel = []
    intensity = []
    like = []
    data = []
    filter = {}
    console.log("filter"+datafilter)
    for (let i of a) {
      if (i[`${datavisual}`] !== "") {
        //console.log(i[`${datavisual}`])
        if (i[`${datavisual}`].toUpperCase() in filter && i[`${datavisual}`]===datafilter.toUpperCase()) {
          filter[i[`${datavisual}`.toUpperCase()]][0] = filter[i[`${datavisual}`.toUpperCase()]][0] + i.relevance
          filter[i[`${datavisual}`.toUpperCase()]][1] = filter[i[`${datavisual}`.toUpperCase()]][1] + i.intensity
          filter[i[`${datavisual}`.toUpperCase()]][2] = filter[i[`${datavisual}`.toUpperCase()]][2] + i.likelihood
          filter[i[`${datavisual}`.toUpperCase()]][3] = filter[i[`${datavisual}`.toUpperCase()]][3] + 1
        }
        else if(i[`${datavisual}`].toUpperCase()===datafilter.toUpperCase()){
          console.log(i[`${datavisual}`])
          filter[i[`${datavisual}`].toUpperCase()] = [i.relevance, i.intensity, i.likelihood, 1]
        }
        else{
          filter[i[`${datavisual}`].toUpperCase()] = [0, 0, 0, 1]
        }
      }
    }
    for (let k in filter) {
      data.push(k)
      rel.push(filter[k][0] / filter[k][3])
      intensity.push(Math.floor(filter[k][1] / filter[k][3]))
      like.push(Math.floor(filter[k][2] / filter[k][3]))
    }
    //console.log(rel)
    //console.log(intensity)
    //console.log(like)
    setr({

      labels: data,
      datasets: [
        {
          axis: 'y',
          label: "RELEVANCE",
          data: rel,
          backgroundColor: "red"

        },
      ],
    })
    seti({

      labels: data,
      datasets: [
        {
          axis: 'y',
          label: "INTENSITY",
          data: intensity,
          backgroundColor: "blue"

        },
      ],
    })
    setl({

      labels: data,
      datasets: [
        {
          axis: 'y',
          label: "LIKELIHOOD",
          data: like,
          backgroundColor: "yellow"

        },
      ],
    })
    setdatafilter('')


  }




  return (
    <div>
      <Container fluid="sm">
        <Row>
          <Form onSubmit={handlesubmit}>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label id="bt-main-form-lb">Select the data</Form.Label>
                <Form.Control
                  as="select"

                  id="inlineFormCustomSelect"
                  custom
                  value={datavisual}
                  onChange={(e) => setdatavisual(e.target.value)}
                >
                  <option value="country">Country</option>
                  <option value="topic">Topics</option>
                  <option value="region">Region</option>
                  <option value="pestle">Pestle</option>
                  <option value="sector">Sector</option>
                  
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <div className="d-grid gap-2">
              <Button variant="outline-primary" id="bt-main-form-lb" type="submit">
                Show
              </Button>
              </div>
             
            </Col>


          </Form>
        </Row>
        {load &&
          <Row>
            <Col lg={6}>
              <Form onSubmit={handlefiltersubmit}>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label>Enter the {datavisual}</Form.Label>
                  <Form.Control type="text" value={datafilter} onChange={(e)=>(setdatafilter(e.target.value))}/>
                  </Form.Group>
               
                  <div className="d-grid gap-2">
                  <Button variant="outline-primary" id="bt-main-form-lb" type="submit" >Filter</Button>
                  </div>
                  </Form>
          
                  </Col>
               
        </Row>
        
         }
              {load &&
                <Row>
                  <Col lg={12}>


                    <Line data={r}


                      options={{
                        responsive: true,
                        title: { text: "THICCNESS SCALE", display: true },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10

                              },
                              gridLines: {
                                display: false
                              }
                            }
                          ],
                          xAxes: [
                            {
                              gridLines: {
                                display: false
                              }
                            }
                          ]
                        }
                      }}
                    />
                  </Col>
                </Row>}
              {load &&
                <Row>
                  <Col lg={12}>


                    <Bar data={i}


                      options={{
                        responsive: true,
                        title: { text: "THICCNESS SCALE", display: true },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                autoSkip: true


                              },
                              gridLines: {
                                display: false
                              }
                            }
                          ],
                          xAxes: [
                            {
                              gridLines: {
                                display: false
                              }
                            }
                          ]
                        }
                      }}
                    />
                  </Col>
                </Row>}
              {load &&
                <Row>
                  <Col lg={12}>


                    <Line data={l}


                      options={{
                        responsive: true,
                        title: { text: "THICCNESS SCALE", display: true },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10

                              },
                              gridLines: {
                                display: false
                              }
                            }
                          ],
                          xAxes: [
                            {
                              gridLines: {
                                display: false
                              }
                            }
                          ]
                        }
                      }}
                    />
                  </Col>
                </Row>}


      </Container>

    </div>
  );
}

        export default Dashboard;