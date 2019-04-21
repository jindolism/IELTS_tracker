import GlobalVal from '../../assets/global';
import { SQLite } from 'expo';

const db = SQLite.openDatabase(GlobalVal.DB_NAME);
const tableName = GlobalVal.DB_TABLE;

function _createTable () {
    db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS '+ tableName +'(id integer PRIMARY KEY AUTOINCREMENT, date text, examType int, examSub int, duration int, score int);',
          [],
          (_, {rows}) => console.log("Table create Success : " + JSON.stringify(rows)),
          (error) => console.log("Create ERROR: " + JSON.stringify(error))
        );
      });
}
function _deleteTable(){
  db.transaction(tx => {
    tx.executeSql(
       'DROP TABLE IF EXISTS ' + tableName + ';',
      [],
      (_, {rows}) => console.log("\n\nTable drop Success : " + JSON.stringify(rows)),
      (error) => console.log("\n\n dropTable ERROR: " + JSON.stringify(error))
    );
  });
}

function _addData(date, type, subject, duration, score) {
    console.log("\nCALL ADD DATA FUNCTION." );
    console.log(" - date : " + date);
    console.log(" - type : " + type);
    console.log(" - subject : " + subject);
    console.log(" - duration : " + duration);
    console.log(" - score : " + score);
    db.transaction(
      tx => {
        tx.executeSql('INSERT INTO '+ tableName +'(date, examType, examSub, duration, score) values (?, ?, ?, ? ,?)',
          [date, type, subject, duration, score],
          (_, { rows }) => console.log("INSERT  " + JSON.stringify(rows)),
          (error) => {console.log("ERROR to ADD : "+ JSON.stringify(error))}
        );
        tx.executeSql('SELECT * FROM '+tableName, 
          [], 
          (_, { rows }) => console.log(JSON.stringify(rows)),
          (error) => {console.log("ERROR to SELECT AFTER ADD : "+ JSON.stringify(error))}
        );
      },
      null,
      null
    );
}

function _getData() {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
          tx.executeSql('select * from ' + tableName +' ORDER BY date DESC', 
          [], 
          (_, { rows }) => {
            console.log("\nStorage Util GET DATA : " + JSON.stringify(rows._array)) ;
            // console.log("\nis it array?" + rows._array);
            resolve(JSON.stringify(rows._array));
          },
          (error) => {console.log("\nGET DATA : ERROR to SELECT AFTER ADD : "+ JSON.stringify(error))}
        );
      },
      null,
      null
    );
    }
  )
}


function _getDataBySubject(convType) {
  return new Promise((resolve, reject) => {
    console.log("_getDataByType - convType : " + convType);
    db.transaction(
      tx => {
          tx.executeSql("select * from " + tableName + " WHERE examSub = ? ORDER BY date DESC", 
          [convType], 
          (_, { rows }) => {
            console.log("\nStorage Util GET DATA : " + JSON.stringify(rows._array)) ;
            resolve(JSON.stringify(rows._array));
          },
          (error) => {console.log("\nGET DATA : ERROR to SELECT AFTER ADD : "+ JSON.stringify(error))}
        );
      },
      null,
      null
    );
    }
  )
}


export {
    _getData,
    _addData,
    _createTable,
    _getDataBySubject
};