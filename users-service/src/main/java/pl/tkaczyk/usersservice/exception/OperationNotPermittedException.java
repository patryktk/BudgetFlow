package pl.tkaczyk.usersservice.exception;

public class OperationNotPermittedException extends RuntimeException{
    public OperationNotPermittedException(String msg) {
        super(msg);
    }
}
