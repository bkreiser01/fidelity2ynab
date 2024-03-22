var Imap = require('imap'), inspect = require('util').inspect;
const { addTransaction } = require("./ynabAPI")
const fidelity_sender = 'fidelityealerts_at_alert.fidelityrewards.com_' + process.env.FIDELITY_EMAIL_NAME

var imap = new Imap({
  user: process.env.IMAP_USER,
  password: process.env.IMAP_PASSWORD,
  host: process.env.IMAP_HOST,
  port: process.env.IMAP_PORT,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
});
 
function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}
  
function fetchEmailInfo(seqno, callback) {
    const f = imap.fetch(seqno, { envelope: true }); // Fetch the envelope information of the email
    f.on('message', function(msg, seqno) {
        msg.once('attributes', function(attrs) {
        callback(attrs.envelope);
        });
    });
}
  
function fetchEmailBody(seqno, callback) {
    const f = imap.fetch(seqno, { bodies: '1' }); // Fetch the body part of the email
    f.on('message', function(msg, seqno) {
        msg.on('body', function(stream, info) {
        let buffer = '';
        stream.on('data', function(chunk) {
            buffer += chunk.toString('utf8');
        });
        stream.once('end', function() {
            callback(buffer);
        });
        });
    });
}
function getCurrentDate() {
    const currentDate = new Date();
  
    // Extracting individual components of the date
    const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
  
    // Formatting the date with leading zeros if necessary
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;
  
    // Constructing the date string in the desired format (mm-dd-yyyy)
    const formattedDate = year + '-' + formattedMonth + '-' + formattedDay;
  
    return formattedDate;
}

function extractInfo(email) {
    let body_arr = email.body.split(' ')

    let a = body_arr[9]
    a = a.replace("$", "-")
    a = parseInt(parseFloat(a) * 1000) // Convert to milliunits https://api.ynab.com/#formats

    let p = ''
    for (let i = 11; i < body_arr.length; i++) {
        if (body_arr[i] == 'To' && body_arr[i + 1] == 'view') {
            break
        }
        p += body_arr[i] + ' '
    }
    p = p.substring(0, p.length - 2);

    let info = {
        payee: p,
        date: getCurrentDate(),
        amount: a
    }

    return info
}

module.exports = {
    startImap(){
        imap.once('ready', function() {
            openInbox(function(err, box) {
                if (err) throw err;
                // Listen for new emails
                imap.on('mail', function(numNewMsgs) {
                // Fetch the latest unseen email
                imap.search(['UNSEEN'], function(err, results) {
                    if (err) throw err;
                    if (results.length > 0) {
                    const latestSeqno = results[results.length - 1]; // Get the latest email sequence number
                    fetchEmailInfo(latestSeqno, function(envelope) {
                        fetchEmailBody(latestSeqno, function(body) {
                            let emailObj = {
                                sender: envelope.sender[0].mailbox,
                                body: body
                            }

                            if (emailObj.sender == fidelity_sender) {
                                let transaction_info = extractInfo(emailObj);
                                console.log(transaction_info)
                                addTransaction(transaction_info)
                            }
                        });
                    });
                    } else {
                        console.log('No new emails.');
                    }
                });
                });
            });
        });
          
        imap.once('error', function(err) {
            console.log(err);
        });
        
        imap.once('end', function() {
        console.log('Connection ended');
        });
        
        // Connect to the IMAP server
        imap.connect();
    },
}