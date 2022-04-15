  <?php
                    require_once('./httpful.phar');

                    $response = \Httpful\Request::post('https://api.github.com/repos/fluid14/Ruszkowski/dispatches')
                                        ->sendsJson()
                                        ->body(['event_type' => 'deploy'], \Httpful\Mime::JSON)
                                        ->addHeader('Authorization', 'token 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')
                                        ->addHeader('Accept', 'application/vnd.github.everest-preview+json')
                                        ->send();
                    var_dump($response);
                    http_response_code(200);
                    exit();

