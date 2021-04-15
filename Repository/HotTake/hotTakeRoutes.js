const _hotTakeRepository = require('./hotTakeRepository');
const dbContext = require('../../Database/dbContext');

module.exports = function (router) {
    const hotTakeRepository = _hotTakeRepository(dbContext);

router.route('/hotTakes')
        .get(hotTakeRepository.getAll)
        .post(hotTakeRepository.post);
        
    router.route('/employees/department')
    .get(employeeRepository.getMulti);

router.use('/employees/:employeeId', employeeRepository.intercept);

router.route('/employees/:employeeId')
        .get(employeeRepository.get)
        .put(employeeRepository.put)
        .delete(employeeRepository.delete);

}