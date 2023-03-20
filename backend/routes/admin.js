const express = require('express');
const User = require('../models/user');
const Stock = require('../models/stock');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../controllers/auth');
const Drug = require('../models/drug');
const Category = require('../models/category');
const Supplier = require('../models/supplier');
const Customer = require('../models/customers');
const Invoice = require('../models/invoice');


let secretKey = "165371566132632461543261543516426184721abghdghjsvdbn"

// middleware to verify the JWT token
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.json({ message: "Unauthorized" });
    }
};

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, confirmPassword } = req.body;


        if (!name || !email || !password || !confirmPassword || !role) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        if (role !== 'admin' && role !== 'doctor' && role !== 'monitor') {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            active: false
        });

        // console.log(user);

        await user.save().catch((err) => console.log(err));

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Given user  is not yet Registered' });
        }

        if (!user.active) {
            return res.status(400).json({ message: 'User is not activated' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }
        let secretKey = "165371566132632461543261543516426184721abghdghjsvdbn"

        const token = jwt.sign({ id: user._id }, secretKey, {
            expiresIn: '1h'
        });

        res.status(201).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Stock POST Api
router.post('/stock', async (req, res) => {
    try {
        const { selectedSupplier, invoiceNumber, paymentType, date, items, amount } = req.body;
        // Create the new Stock object
        const newStock = new Stock({
            selectedSupplier,
            invoiceNumber,
            paymentType,
            date,
            amount,
            items,

        });


        await newStock.save();

        res.status(200).json(newStock);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

router.get('/stock', async (req, res) => {
    try {
        let stocks = await Stock.find({});

        if (req.query.supplier) {
            const regex = new RegExp(req.query.supplier, 'i');
            stocks = stocks.filter(stock => regex.test(stock.selectedSupplier));
        }

        res.status(200).json({ stocks });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete the Stock
router.delete("/stock/:id", verifyToken, async (req, res) => {
    try {
        const authData = await jwt.verify(req.token, "165371566132632461543261543516426184721abghdghjsvdbn");
        const user = await User.findOne({ _id: authData.id })

        if (user.role === "admin") {
            const stock = await Stock.findByIdAndDelete(req.params.id);
            if (!stock) {
                res.status(404).send("Stock entry not found");
            } else {
                res.sendStatus(200);
            }
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.sendStatus(401);
    }
});



// Edit the specific stock
router.put('/stock/:id', verifyToken, (req, res) => {
    Stock.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, stock) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to update stock' });
        }
        res.json(stock);
    });
});

// Add Drugs
router.post('/drugs', async (req, res) => {
    console.log(req.body)
    try {
        const { name, packaging, BatchID, Exdate, supplier, Quantity } = req.body;

        if (!name || !packaging || !BatchID || !Exdate || !supplier || !Quantity) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const drug = new Drug({
            name,
            packaging,
            BatchID,
            Exdate,
            supplier,
            Quantity
        });

        await drug.save();

        res.status(201).json({ drug, Message: 'Successfully Stored the drug' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all the Drugs
router.get('/drugs', async (req, res) => {
    console.log(req.query.name)
    try {
        let drugs = await Drug.find({});

        if (req.query.name) {
            const regex = new RegExp(req.query.name, 'i');
            drugs = drugs.filter(drug => regex.test(drug.name));
        }

        res.status(200).json({ drugs });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete the Drug
router.delete("/drug/:id", verifyToken, async (req, res) => {
    try {
        const authData = await jwt.verify(req.token, "165371566132632461543261543516426184721abghdghjsvdbn");
        const user = await User.findOne({ _id: authData.id })

        if (user.role === "admin") {
            const drug = await Drug.findByIdAndDelete(req.params.id);
            if (!drug) {
                res.status(404).send("Drug entry not found");
            } else {
                res.sendStatus(200);
            }
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.sendStatus(401);
    }
});

// Edit the specific drug
router.put('/drug/:id', verifyToken, (req, res) => {
    Drug.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, drug) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to update Drug' });
        }
        res.json(Drug);
    });
});

// GET data for a specific supplier
router.get('/drug/:name', async (req, res) => {
    try {
        const drug = await Drug.findOne({ name: req.params.name });
        if (!drug) {
            return res.status(404).json({ message: 'Drugs not found' });
        }
        res.json(drug);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Get all the users
router.get('/users', async (req, res) => {
    try {
        let users = await User.find({});
        if (req.query.name) {
            const regex = new RegExp(req.query.name, 'i');
            users = users.filter(user => regex.test(user.name));
        }

        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Activate the user
router.put('/user/activate/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { active: true }, { new: true });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        return res.send({ message: 'User activated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Failed to activate user' });
    }
});

// De-activate the user
router.put('/user/deativate/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { active: false }, { new: true });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        return res.send({ message: 'User de-activated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Failed to de-activate user' });
    }
});


// Add Category
router.post('/category', async (req, res) => {
    console.log(req.body)
    try {
        const { Name, Description } = req.body;

        if (!Name || !Description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const category = new Category({
            Name,
            Description,
        });

        await category.save();

        res.status(201).json({ category, Message: 'Successfully Stored the category' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



// Get all the category
router.get('/category', async (req, res) => {
    try {
        let categories = await Category.find({});

        if (req.query.name) {
            const regex = new RegExp(req.query.name, 'i');
            categories = categories.filter(category => regex.test(category.Name));
        }

        res.status(200).json({ categories });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete the Category
router.delete("/category/:id", verifyToken, async (req, res) => {
    try {
        const authData = await jwt.verify(req.token, "165371566132632461543261543516426184721abghdghjsvdbn");
        const user = await User.findOne({ _id: authData.id })
        if (user.role === "admin") {
            const category = await Category.findByIdAndDelete(req.params.id);
            if (!category) {
                res.status(404).send("category entry not found");
            } else {
                res.sendStatus(200);
            }
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.sendStatus(401);
    }
});

// Edit the Category
router.put('/category/:id', verifyToken, (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, stock) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to update Category' });
        }
        res.json(stock);
    });
});

// Search functionallity
router.get('/search', async (req, res) => {
    const query = req.query.q;


    Stock.find({ Supplier: { $regex: query, $options: "i" } }).toArray((err, result) => {
        if (err) throw err;
        res.json(result);
        client.close();
    });

});

// Supplier POST API
router.post('/supplier', async (req, res) => {
    try {
        const supplier = new Supplier(req.body);
        const savedSupplier = await supplier.save();
        res.status(201).json(savedSupplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Add supplier
router.post('/supplier', async (req, res) => {
    try {
        const { name, address, email, phone } = req.body;

        if (!name || !address || !email || !phone) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const supplier = new Supplier({
            name,
            address,
            email,
            phone
        });

        await supplier.save();

        res.status(201).json({ supplier, Message: 'Successfully Stored the Supplier Information' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Supplier

router.get('/supplier', async (req, res) => {
    try {
        let suppliers = await Supplier.find({});

        if (req.query.name) {
            const regex = new RegExp(req.query.name, 'i');
            suppliers = suppliers.filter(supplier => regex.test(supplier.name));
        }

        res.status(200).json({ suppliers });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Edit Supplier
router.put('/supplier/:id', verifyToken, (req, res) => {
    Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, supplier) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to update supplier' });
        }
        res.json(supplier);
    });
});


// Delete the Supplier
router.delete("/supplier/:id", verifyToken, async (req, res) => {
    try {
        const authData = await jwt.verify(req.token, "165371566132632461543261543516426184721abghdghjsvdbn");
        const user = await User.findOne({ _id: authData.id })
        if (user.role === "admin") {
            const supplier = await Supplier.findByIdAndDelete(req.params.id);
            if (!supplier) {
                res.status(404).send("supplier entry not found");
            } else {
                res.sendStatus(200);
            }
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.sendStatus(401);
    }
});

// GET data for a specific supplier
router.get('/supplier/:name', async (req, res) => {
    try {
        const supplier = await Supplier.findOne({ name: req.params.name });
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Add customer
router.post('/customer', async (req, res) => {
    try {
        const { name, address, email, phone } = req.body;

        if (!name || !address || !email || !phone) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const customer = new Customer({
            name,
            address,
            email,
            phone
        });

        await customer.save();

        res.status(201).json({ customer, Message: 'Successfully Stored the customer Information' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Get Customer
router.get('/customer', async (req, res) => {
    try {
        let customers = await Customer.find({});

        if (req.query.name) {
            const regex = new RegExp(req.query.name, 'i');
            customers = customers.filter(customer => regex.test(customer.name));
        }

        res.status(200).json({ customers });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET data for a specific Customer
router.get('/customer/:name', async (req, res) => {
    try {
        const customer = await Customer.findOne({ name: req.params.name });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Edit Customer
router.put('/customer/:id', verifyToken, (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, customer) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to update Customer' });
        }
        res.json(customer);
    });
});

// Delete the Customer
router.delete("/customer/:id", verifyToken, async (req, res) => {
    try {

        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            res.status(404).send("customer entry not found");

        } else {
            return res.status(200).json({ result: 'Succesfully deleted customer' });
        }
    } catch (err) {
        res.sendStatus(401);
    }
});

// Create an invoice
router.post('/invoice', async (req, res) => {
    try {
        const { invoiceNumber, customer, paymentType, date, contact, total, discount, items, paid, change } = req.body;

        // Calculate the netTotal for each item
        const itemsWithNetTotal = items.map(item => {
            const netTotal = item.amount - item.discount;
            return { ...item, netTotal };
        });

        // Create the new invoice object
        const newInvoice = new Invoice({
            invoiceNumber,
            customer,
            paymentType,
            date,
            contact,
            total,
            discount,
            items: itemsWithNetTotal,
            paid,
            change
        });

        // Save the new invoice object to the database
        await newInvoice.save();

        res.status(201).json(newInvoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});




// Get Customer
router.get('/invoices', async (req, res) => {
    try {
        let invoices = await Invoice.find({});

        if (req.query.name) {
            const regex = new RegExp(req.query.name, 'i');
            invoices = invoices.filter(invoice => regex.test(invoice.customer));
        }

        res.status(200).json({ invoices });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/invoice/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        return res.json(invoice);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Edit Customer
router.put('/invoice/:id', verifyToken, (req, res) => {
    Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, invoice) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to update Customer' });
        }
        res.json(invoice);
    });
});

// Delete the Customer
router.delete("/invoice/:id", verifyToken, async (req, res) => {
    try {

        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            res.status(404).send("Invoice entry not found");

        } else {
            return res.status(200).json({ result: 'Succesfully deleted invoice' });
        }
    } catch (err) {
        res.sendStatus(401);
    }
});


module.exports = router;

