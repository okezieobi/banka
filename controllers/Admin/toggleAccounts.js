// @ts-ignore
import logic from '../index';
import data from '../../db';
import services from '../../services';

logic.toggleAccountState = ( req, res ) => {
    if ( !req.body.accountStatus ) return services.errorResponse( res, 400, 'Account status is required' );
    if ( !services.checkName( req.body.accountStatus ) ) return services.errorResponse( res, 400, 'Account status must be letters' );
    if ( req.body.accountStatus !== 'active' && req.body.accountStatus !== 'Active' &&
        req.body.accountStatus !== 'dormant' && req.body.accountStatus !== 'Dormant' ) return services.errorResponse( res, 400, 'Account status must equal active or dormant' );
    if ( !req.headers[ 'admin-id' ] ) return services.errorResponse( res, 400, 'Admin id is required' );
    if ( !services.checkNumber( req.headers[ 'admin-id' ] ) ) return services.errorResponse( res, 400, 'Admin id must be numbers' );
    if ( !services.findById( data.admins, req.headers, 'id', 'admin-id' ) ) return services.errorResponse( res, 404, 'Admin id not found, only registered admins can update an account detail' );
    if ( !services.checkNumber( req.params.account_number ) ) return services.errorResponse( res, 400, 'Account number must be a number' );
    const bankAccount = services.findById( data.bankAccounts, req.params, 'accountNumber', 'account_number' );
    if ( !bankAccount ) return services.errorResponse( res, 404, 'Account number not found' );
    bankAccount.status = req.body.accountStatus;
    const statusResponse = data.updateAccountStatus( bankAccount );
    return services.successResponse( res, 200, statusResponse );
};

export default logic.toggleAccountState;
