import React, { useState, useEffect} from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

function GeneratePDF() {
    const [dayData, setDayData] = useState([]);
    const [profileData, setProfileData] = useState({});
    const [total, setTotal] = useState(0.00);
    const [tax, setTax] = useState(0.00);
    const [totalDue, setTotalDue] = useState(0.00)
    const [totalHour, setTotalHour] = useState(0)
    const [totalMinute, setTotalMinute] = useState(0)
    const [totalUnitHours, setTotalUnitHours] = useState(0.00)

    const BORDER_COLOR = '#bfbfbf'
    const BORDER_STYLE = 'solid'
    const COL1_WIDTH = 40
    const COLN_WIDTH = (100 - COL1_WIDTH) / 3

    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#E4E4E4'
        },
        row: {
            flexDirection: 'row',
        },
        section: {
        margin: 10,
        padding: 10,
        },
        heading: {
            fontSize: '40pt',
        },
        section_from: {
            marginLeft: '20%',
            marginTop: 10,
            padding: 10,
            flexDirection: 'row',
        },
        section_to: {
            marginTop: '5%',
            marginLeft: '10%',
            flexDirection: 'row',
        },
        regular: {
            fontSize: '14pt',
        },
        name: {
            fontSize: '14pt',
            fontWeight: 'bold',
        },
        material: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            marginLeft: '20pt',
            fontSize: '14pt',
        },
        gap: {
            marginTop: '5pt',
        },
        table: {
            display: "table",
            width: "auto",
            borderStyle: BORDER_STYLE,
            borderColor: BORDER_COLOR,
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            margin: 10
          },
          table2: {
            display: "table",
            width: 200,
            borderStyle: BORDER_STYLE,
            borderColor: BORDER_COLOR,
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            margin: 10,
            marginLeft: "auto"
          },
          tableRow: {
            margin: "auto",
            flexDirection: "row"
          },
          tableRow2: {
            margin: 0,
            width: 500,
            flexDirection: "row"
          },
          tableCol1Header: {
            width: COL1_WIDTH + '%',
            borderStyle: BORDER_STYLE,
            borderColor: BORDER_COLOR,
            borderBottomColor: '#000',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0
          },
          tableColHeader: {
            width: COLN_WIDTH + "%",
            borderStyle: BORDER_STYLE,
            borderColor: BORDER_COLOR,
            borderBottomColor: '#000',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0
          },
          tableCol1: {
            width: COL1_WIDTH + '%',
            borderStyle: BORDER_STYLE,
            borderColor: BORDER_COLOR,
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0
          },
          tableCol: {
            width: COLN_WIDTH + "%",
            borderStyle: BORDER_STYLE,
            borderColor: BORDER_COLOR,
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0
          },
          tableCellHeader: {
            margin: 5,
            fontSize: 12,
            fontWeight: 500
          },
          tableCell: {
            margin: 5,
            fontSize: 10
          },
          fontBold: {
            fontWeight: 1000,
            fontSize: 12,
            color: '#000'
          }
    });

    const MyDocument = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.row}>
                <View style={styles.section}>
                <Text style={styles.heading}>INVOICE</Text>
                </View>
                <View style={styles.section_from}>
                    <Text style={styles.regular}>From:</Text>
                    <View style={styles.material}>
                        <Text style={styles.name}>{profileData.name}</Text>
                        <Text style={styles.gap}>{profileData.address}</Text>
                        <Text style={styles.gap}>{profileData.phonenumber}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.section_to}>
                    <Text style={styles.regular}>To:</Text>
                    <View style={styles.material}>
                        <Text style={styles.name}>{profileData.invoicename}</Text>
                        <Text style={styles.gap}>{profileData.invoiceaddress}</Text>
                        <Text style={styles.gap}>{profileData.invoicephonenumber}</Text>
                    </View>
                </View>
                <View style={styles.section_from}>
                    <View style={styles.material}>
                        <Text style={[styles.regular, styles.gap]}>Invoice ID: {profileData.invoiceid}</Text>
                        <Text style={[styles.regular, styles.gap]}>Issue Date: {formatDate(profileData.invoiceissuedate)}</Text>
                        <Text style={[styles.regular, styles.gap]}>Due Date: {formatDate(profileData.invoiceduedate)}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol1Header}>
                        <Text style={styles.tableCellHeader}>Description</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Quantity</Text>
            </View>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Unit Price</Text>
            </View>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Amount</Text>
            </View>
                </View>
                {dayData.map((data, index) => {
                return (
                    <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol1}>
                      <Text style={styles.tableCell}>
                        <Text>
                            {data.note} [ {formatDate(data.date)} ]
                        </Text>

                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        <Text>
                            Hours: {data.hours}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                          <Text>
                              ${profileData.hourlyRate}
                          </Text>
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                          <Text>
                              ${parseFloat(getHours(data.hours) * profileData.hourlyRate).toFixed(2)}
                          </Text>
                      </Text>
                    </View>
                  </View>
                )
            })}
            </View>
            <View style={styles.table}>
            <View style={styles.tableRow}>
                    <View style={styles.tableCol1}>
                      <Text style={styles.tableCell}>
                        <Text>
                            Pay Period: [ {formatDate(profileData.fromPayPeriod)} - {formatDate(profileData.toPayPeriod)} ]
                        </Text>

                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        <Text>
                            Total Hours: {totalHour}:{totalMinute}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                          <Text>
                            Total Unit Hours: {parseFloat(totalUnitHours).toFixed(2)}
                          </Text>
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                          <Text>
                          </Text>
                      </Text>
                    </View>
                  </View>
            </View>
            <View style={styles.table2}>
                <View style={styles.tableRow2}>
                  <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.fontBold]}>Subtotal:</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>${parseFloat(total).toFixed(2)}</Text>
                  </View>
                </View>
                <View style={styles.tableRow2}>
                  <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.fontBold]}>Tax Rate:</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{profileData.taxRate}%</Text>
                  </View>
                </View>
                <View style={styles.tableRow2}>
                  <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.fontBold]}>Tax:</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>${parseFloat(tax).toFixed(2)}</Text>
                  </View>
                </View>
                <View style={styles.tableRow2}>
                  <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.fontBold]}>Amount Due:</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>${parseFloat(totalDue).toFixed(2)}</Text>
                  </View>
                </View>
            </View>
          </Page>
        </Document>
      );

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile'))
        if(profile){
            setProfileData(profile)
        }

        let day = JSON.parse(localStorage.getItem("days"));
        if(day){
            setDayData(day)
        }
    }, [])

    useEffect(() => {
      getTotal(dayData)
      getTotalHours(dayData)
    }, [profileData, dayData])

    useEffect(() => {
      getTotalAmountDue()
    }, [tax, total])

    function getHours(hour){
        const hours = hour.split(":")
        const minuteUnit = hours[1]/60
        const bigHours = hours[0]
        const total = parseFloat(bigHours) + parseFloat(minuteUnit)
        return total
    }

    function getTotal(dayData){
      let total = 0.00

      for(let day of dayData){
        const hours = day.hours.split(":")
        const minuteUnit = hours[1]/60
        const bigHours = hours[0]
        const hoursPrice = parseFloat(bigHours) + parseFloat(minuteUnit)
        total += hoursPrice * profileData.hourlyRate
      }

      setTotal(total)
      getTax(total)
    }

    function getTax(total){
      setTax(total * toDecimal(parseFloat(profileData.taxRate)))
    }

    function getTotalAmountDue(){
      setTotalDue(tax + total)
    }

    function toDecimal(percent) {
      const parsed = parseFloat(percent);

      if (!Number.isNaN(parsed)) {
        return parseFloat(percent) / 100;
      } else {
        return 0;
      }
    }

    function getTotalHours(dayData){
      let totalHour = 0
      let totalMinute = 0

      for(let day of dayData){
        const currentDay = day.hours.split(":")
        totalHour += parseInt(currentDay[0])
        totalMinute += parseInt(currentDay[1])
      }

      while(totalMinute > 60){
        totalMinute -= 60
        totalHour += 1
      }

      let unit = parseFloat(totalMinute/60)
      setTotalUnitHours(totalHour + unit)

      setTotalHour(totalHour.toString().padStart(2, '0'))
      setTotalMinute(totalMinute.toString().padStart(2, '0'))
    }

    function formatDate(date){
      let aDate = new Date(date)
      return aDate.toLocaleDateString("en-US",
      {year: "numeric",
      timeZone: 'UTC',
      month: "2-digit",
      day: "2-digit",
      });
    }

  return (
      <div className="container" id="pdf-container">
          {dayData.length > 0 ? <div></div> : <div className="error">Required to fill out the Calculator</div>}
          { Object.keys(profileData).length === 13 ? <div></div> : <div className="error">Required to fill out the Profile</div> }
          {dayData.length > 0 && Object.keys(profileData).length === 13 ?
            <PDFViewer>
                <MyDocument />
            </PDFViewer> :
          <div></div>}
      </div>
  );
}

export default GeneratePDF;
